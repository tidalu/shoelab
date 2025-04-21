#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const chalkAnimation = require("chalk-animation");
const path = require("path");
const dataPath = path.join(__dirname, "../data");
const ShoeFactory = require("../classes/ShoeFactory");
const AthleteProfile = require("../classes/AthleteProfile");
const PerformanceTracker = require("../classes/PerformanceTracker");
const RecommendationEngine = require("../classes/RecommendationEngine");
const { saveJSON, loadJSON } = require("../utils/FileManager");
const { askQuestion } = require("../utils/askQuestion");
const loadExistingFiles = require("../utils/loadExistingUserData");
const { loadShoeData, saveShoeData } = require("../utils/LoadShoeData");
const reviveShoes = require("../utils/reviveShoes");
const {
  getActiveUserProfile,
  getActiveUserShoes,
  getActiveUserSelectedShoe,
  activeUser,
} = require("../utils/getActiveUser");
const visualizeWearLevel = require("../utils/visualizeWearLevel");

const program = new Command();
let shoeData = loadShoeData();
let shoes = [];
let selectedShoe = null;
let profile = null;
let finalName = "";

program
  .command("init")
  .description("Create a new user profile")
  .action(async () => {
    const animation = chalkAnimation.rainbow(
      "👟 Welcome to ShoeLab CLI! Initializing..."
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    animation.stop();

    profile = await loadExistingFiles();
    if (!profile) {
      const name = await askQuestion("👤 What's your name? ");
      const footSize = parseFloat(
        await askQuestion("📏 Your foot size (EU)? ")
      );
      const preferredTerrain = await askQuestion(
        "🌍 Preferred terrain (trail/rocky/mud)? "
      );
      const activityLevel = await askQuestion(
        "🔥 Activity level (light/moderate/intense)? "
      );

      profile = new AthleteProfile(
        name,
        footSize,
        preferredTerrain,
        activityLevel,
        preferredTerrain === "trail" ? "RunningShoe" : "HikingBoot"
      );
    }
    // save
    finalName = profile.name;
    saveJSON(`${finalName}_profile.json`, profile);
    saveJSON("activeUser.json", { name: finalName });
    console.log(`Profile created for ${finalName}`);
    process.exit(0);
  });

program
  .command("generate")
  .description("Generate shoes")
  .action(async () => {
    const spinner = ora("🔧 Generating shoes...").start();
    await new Promise((r) => setTimeout(r, 1000));
    shoes = ShoeFactory.generateMany("RunningShoe", 5).concat(
      ShoeFactory.generateMany("HikingBoot", 5)
    );
    spinner.succeed("🎉 Shoes generated successfully!");

    const showShoeList = await askQuestion(
      "Would you like to see the generated shoes? (yes/no) "
    );
    if (showShoeList.toLowerCase() === "yes") {
      console.log("Generated Shoes:");
      shoes.forEach((shoe, i) => {
        console.log(`#${i + 1} - ${shoe.brand} ${shoe.modelName}`);
      });
    }
    const saveShoeList = await askQuestion(
      "Would you like to save the generated shoes? (yes/no) "
    );
    if (saveShoeList.toLowerCase() === "yes") {
      const shoeList = shoes.map((shoe) => shoe.getDetailedInfo());
      const active = activeUser();
      finalName = active.name;
      saveJSON(`${finalName}_shoes.json`, shoeList);
      console.log(chalk.green("Shoes saved successfully!"));
    }
    console.log(
      chalk.blue(
        "You can now use the 'recommend' command to get shoe recommendations."
      )
    );
    process.exit(0);
  });

program
  .command("recommend")
  .description("Recommend shoes")
  .action(async () => {
    const recommendSpinner = ora("📊 Analyzing profile and finding the best matches...").start();
    await new Promise(r => setTimeout(r, 1500));
    recommendSpinner.succeed("🔍 Recommendations ready!");
    

    const active = activeUser();
    finalName = active.name;

    // load acive user profil;e
    profile = getActiveUserProfile();

    // load user shoes
    const savedShoes = getActiveUserShoes();

    const ranked = RecommendationEngine.recommend(
      profile,
      reviveShoes(savedShoes)
    );
    ranked.slice(0, 3).forEach((r, i) => {
      console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
      console.table(r.shoe);
    });

    while (true) {
      const selectIndex = await askQuestion(
        "Which shoe would you like to use (1, 2, or 3)? "
      );
      const index = parseInt(selectIndex);

      if (!isNaN(index) && index >= 1 && index <= 3 && ranked[index - 1]) {
        selectedShoe = ranked[index - 1].shoe;
        break;
      }

      console.log("❌ Invalid selection. Please enter 1, 2, or 3.");
    }
    saveJSON(`${profile.name}_selectedShoe.json`, selectedShoe);
    console.log(
      `\n👟 You selected: ${selectedShoe.brand} ${selectedShoe.modelName}`
    );
    if (!shoeData) {
      shoeData = loadShoeData();
    }
    if (!shoeData[selectedShoe.modelName]) {
      shoeData[selectedShoe.modelName] = {
        totalDistance: 0,
        durabilityLeft: selectedShoe.durabilityLeft,
        wearLevel: 0,
      };
    }
    saveShoeData(shoeData);
    process.exit(0);
  });

program.command("run").description("Log a run").action(runAction);

program
  .command("delete")
  .description("Delete a shoe")
  .action(async () => {
    const wantToDelete = await askQuestion(
      "Do you want to delete a shoe? (yes/no) "
    );
    if (wantToDelete.toLowerCase() === "yes") {
      const allModels = Object.keys(loadShoeData());

      if (allModels.length === 0) {
        console.log("No shoes to delete.");
      } else {
        console.log("\n📂 Shoes available for deletion:");
        allModels.forEach((model, i) => {
          console.log(`${i + 1}. ${model}`);
        });

        const deleteIndex = await askQuestion(
          "Enter the number of the shoe to delete: "
        );
        const index = parseInt(deleteIndex);
        shoeData = loadShoeData();
        if (!isNaN(index) && allModels[index - 1]) {
          const deletedModel = allModels[index - 1];
          delete shoeData[deletedModel];
          ora().succeed(`🗑️ Deleted shoe: ${chalk.red.bold(deletedModel)}`);

          saveShoeData(shoeData);
        } else {
          console.log("❌ Invalid selection. No shoe deleted.");
        }
      }
    }

    process.exit(0);
  });

// end words
program
  .command("exit")
  .description("Exit the application")
  .action(() => {
    console.log(
      `\n📁 Saved your profile and selected shoe for ${activeUser().name}.`
    );
    console.log("\n✅ Done. Thanks for using ShoeLab!");
    process.exit(0);
  });

program.parse(process.argv);

async function runAction() {
  const animation = chalkAnimation.neon("✅ Run logged successfully!")
  await new Promise((resolve) => setTimeout(resolve, 2000));
  animation.stop();
  const distanceRan = parseFloat(
    await askQuestion("🏃‍♂️ How many kilometers did you run?    ")
  );
  let selectedShoe = reviveShoes(getActiveUserSelectedShoe());

  if (distanceRan > 0) {
    if (!shoeData) {
      shoeData = loadShoeData();
    }

    if (!shoeData[selectedShoe.modelName]) {
      shoeData[selectedShoe.modelName] = {
        totalDistance: 0,
        durabilityLeft: selectedShoe.durabilityLeft,
        wearLevel: 0,
      };
    }

    shoeData[selectedShoe.modelName].totalDistance += distanceRan;
    shoeData[selectedShoe.modelName].durabilityLeft -= distanceRan;

    const wearLevel = PerformanceTracker.calculateWearLevel(
      shoeData[selectedShoe.modelName].totalDistance,
      selectedShoe.durabilityLeft
    );
    shoeData[selectedShoe.modelName].wearLevel = wearLevel.toFixed(2);

    // updateed shoe status
    console.log(
      `\n🏃‍♂️ You ran ${distanceRan} km in your ${selectedShoe.brand} ${selectedShoe.modelName}.`
    );
    console.log(
      `🔧 New durability left: ${
        shoeData[selectedShoe.modelName].durabilityLeft
      } km`
    );
    console.log(
      `💥 Current wear level: ${visualizeWearLevel(
        shoeData[selectedShoe.modelName].wearLevel
      )}`
    );

    PerformanceTracker.trackRun(shoeData, selectedShoe, distanceRan);
    saveJSON("../shoeData.json", shoeData);
    // update data
    saveShoeData(shoeData);

    const recommendBasedOnWearLevel = await askQuestion(
      "Would you like to recommend shoes based on wear level? (yes/no) "
    );
    if (recommendBasedOnWearLevel.toLowerCase() === "yes") {
      console.log("\n📊 Recommending shoes based on wear level...");
      let updatedRank = RecommendationEngine.recommend(
        getActiveUserProfile(),
        getActiveUserShoes()
      ).filter((r) => r.shoe.durabilityLeft > 0);

      // display updated recommendations
      updatedRank.slice(0, 3).forEach((r, i) => {
        console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
        console.table(r.shoe);
      });

      // append the selected shoe to the shoe data
      const newSelectedShoe = await askQuestion(
        "Which shoe would you like to select and save? (1, 2, or 3) "
      );
      const index = parseInt(newSelectedShoe);
      // save
      if (!isNaN(index) && index >= 1 && index <= 3 && updatedRank[index - 1]) {
        selectedShoe = updatedRank[index - 1].shoe;
        saveJSON(`${activeUser().name}_selectedShoe.json`, selectedShoe);
        console.log(
          `\n👟 You selected: ${selectedShoe.brand} ${selectedShoe.modelName}`
        );
      } else {
        console.log("❌ Invalid selection. No shoe saved.");
      }
    } else {
      console.log("No recommendations made.");
    }

    const trackAnotherRun = await askQuestion(
      "Would you like to track another run? (yes/no) "
    );
    if (trackAnotherRun.toLowerCase() === "yes") {
      console.log("Tracking another run...");

      // run command action again
      console.log("Running the run command again...");
      runAction();
    } else {
      console.log("Exiting the run command...");
      process.exit(0);
    }
  } else {
    console.log("❌ Invalid distance. Please enter a positive number.");
  }
}

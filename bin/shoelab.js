#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const chalkAnimation = require("chalk-animation");
const path = require("path");
const asciichart = require("asciichart");
const dataPath = path.join(__dirname, "../data");
const ShoeFactory = require("../classes/ShoeFactory");
const AthleteProfile = require("../classes/AthleteProfile");
const PerformanceTracker = require("../classes/PerformanceTracker");
const RecommendationEngine = require("../classes/RecommendationEngine");
const { saveJSON, loadJSON } = require("../utils/FileManager");
const { askQuestion } = require("../utils/askQuestion");
const loadExistingFiles = require("../utils/loadExistingUserData");
const { loadShoeData, saveShoeData } = require("../utils/LoadShoeData");
const { loadUserContext } = require("../utils/loadUserContext");
const {
  validateFootSize,
  validateTerrain,
  validateActivityLevel,
  validateDistance,
  validateSelection,
} = require("../utils/inputValidation");
const visualizeWearLevel = require("../utils/visualizeWearLevel");

const program = new Command();
let shoeData = loadShoeData();
const tracker = new PerformanceTracker();

// load tracker logs
const trackerFile = path.join(dataPath, "tracker.json");
if (loadJSON(trackerFile)) {
  tracker.logs = loadJSON(trackerFile).logs || [];
}

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
      let footSize, preferredTerrain, activityLevel;
      while (true) {
        try {
          footSize = validateFootSize(
            await askQuestion("📏 Your foot size (EU, 30-50)? ")
          );
          break;
        } catch (error) {
          console.log(chalk.red(`❌ ${error.message}`));
        }
      }

      while (true) {
        try {
          preferredTerrain = await askQuestion(
            "🌍 Preferred terrain (trail, rocky, mud)? "
          );
          break;
        } catch (error) {
          console.log(chalk.red(`❌ ${error.message}`));
        }
      }

      while (true) {
        try {
          activityLevel = validateActivityLevel(
            await askQuestion("🔥 Activity level (light, moderate, intense)? ")
          );
          break;
        } catch (error) {
          console.log(chalk.red(`❌ ${error.message}`));
        }
      }

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
    const { profile } = loadUserContext(true, false, false);
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
    } else {
      console.log(chalk.yellow("any answer other than yes will be no"));
      console.log(
        chalk.blue(
          "You can use the 'recommend' command to get shoe recommendations."
        )
      );
    }
    const saveShoeList = await askQuestion(
      "Would you like to save the generated shoes? (yes/no) "
    );
    if (saveShoeList.toLowerCase() === "yes") {
      const shoeList = shoes.map((shoe) => shoe.getDetailedInfo());
      finalName = profile.name;
      saveJSON(`${finalName}_shoes.json`, shoeList);
      console.log(chalk.green("Shoes saved successfully!"));
      console.log(
        chalk.blue(
          "You can now use the 'recommend' command to get shoe recommendations."
        )
      );
    } else {
      console.log(chalk.yellow("Shoes not saved."));
      console.log(
        chalk.blue(
          "To be able to use the 'recommend' or other commands, please save the shoes. so unfortunately you have to run the 'generate' command again."
        )
      );
    }
    process.exit(0);
  });

program
  .command("recommend")
  .description("Recommend shoes")
  .action(async () => {
    const recommendSpinner = ora(
      "📊 Analyzing profile and finding the best matches..."
    ).start();
    await new Promise((r) => setTimeout(r, 1500));
    recommendSpinner.succeed("🔍 Recommendations ready!");
    let { profile, shoes, selectedShoe } = loadUserContext(true, true, false);
    finalName = profile.name;
    // load selected shoe
    // load user shoes
    const savedShoes = shoes;
    if (!savedShoes) {
      console.log(chalk.red("❌ No shoes found. Please generate shoes first."));
      process.exit(0);
    }

    // filter out the shoe of the user
    savedShoes = savedShoes.filter((shoe) => {
      if (
        shoe.modelName === selectedShoe.modelName &&
        shoe.brand === selectedShoe.brand &&
        shoe.size === selectedShoe.size
      ) {
        return false;
      }
    });
    const ranked = RecommendationEngine.recommend(profile, savedShoes);
    ranked.slice(0, 3).forEach((r, i) => {
      console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
      console.table(r.shoe);
    });

    let selectedIndex;
    while (true) {
      try {
        selectedIndex = validateSelection(
          await askQuestion("Which shoe would you like to use (1, 2, or 3)? "),
          3
        );
        break;
      } catch (error) {
        console.log(chalk.red(`❌ ${error.message}`));
      }
    }

    selected = ranked[selectedIndex - 1].shoe;

    saveJSON(`${profile.name}_selectedShoe.json`, selected);
    console.log(`\n👟 You selected: ${selected.brand} ${selected.modelName}`);
    if (!shoeData) {
      shoeData = loadShoeData();
    }
    if (!shoeData[selected.modelName]) {
      shoeData[selected.modelName] = {
        totalDistance: 0,
        durabilityLeft: selected.durabilityLeft,
        wearLevel: 0,
      };
    }
    saveShoeData(shoeData);
    process.exit(0);
  });

program
  .command("run")
  .description("Log a run")
  .action(async () => {
    const { profile, selectedShoe } = loadUserContext(true, false, true);
    if (!selectedShoe) {
      console.log(
        chalk.red(
          "❌ No shoe selected. Please use the 'recommend' command first. and select a shoe."
        )
      );
      process.exit(0);
    }
    await runAction(profile, selectedShoe);
  });

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

        const deleteIndex = validateSelection(
          await askQuestion("Enter the number of the shoe to delete: "),
          allModels.length
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

// TODO : fix the wearLevel data, not working : DONE
program
  .command("stats")
  .description("Display run and shoe statistics")
  .action(async () => {
    const { activeUser, profile } = loadUserContext(true, false, false);
    const stats = tracker.getRunStats();
    if (stats.runLogs.length === 0) {
      console.log(
        chalk.yellow(
          "⚠️ No runs logged yet. Use the 'run' command to log a run."
        )
      );
      process.exit(0);
    }

    console.log(chalk.blue(`\n📊 Run Statistics for ${activeUser.name}`));
    console.log(`Total Distance Run: ${stats.totalDistance.toFixed(2)} km`);
    console.log(`Total Runs: ${stats.runLogs.length}`);

    console.log("\n📋 Run History:");
    tracker.printLogs();

    console.log("\n👟 Shoe Statistics:");
    console.table(
      Object.entries(stats.runsByShoe).map(([model, data]) => ({
        Shoe: model,
        "Total Distance (km)": data.totalDistance.toFixed(2),
        Runs: data.runs,
        "Wear Level (%)": data.wearLevel.toFixed(2),
      }))
    );

    console.log("\n📈 Shoe Wear Level Chart:");
    const wearData = Object.values(stats.runsByShoe).map(
      (data) => data.wearLevel
    );
    const config = {
      height: 10,
      colors: [asciichart.blue],
    };
    console.log(
      asciichart.plot([wearData], {
        ...config,
        labels: Object.keys(stats.runsByShoe),
      })
    );

    const showRunHistoryChart = await askQuestion(
      "Would you like to see a run distance history chart? (yes/no) "
    );
    if (showRunHistoryChart.toLowerCase() === "yes") {
      console.log("\n📈 Run Distance History:");
      const distanceData = stats.runLogs.map((log) => log.distance);
      console.log(
        asciichart.plot([distanceData], {
          ...config,
          labels: stats.runLogs.map((log) =>
            new Date(log.timestamp).toLocaleDateString()
          ),
        })
      );
    }

    process.exit(0);
  });

// end words
program
  .command("exit")
  .description("Exit the application")
  .action(() => {
    const { activeUser } = loadUserContext(false, false, false);
    console.log(
      `\n📁 Saved your profile and selected shoe for ${activeUser.name}.`
    );
    console.log("\n✅ Done. Thanks for using ShoeLab!");
    process.exit(0);
  });

program.parse(process.argv);

async function runAction(profile, selShoes) {
  const { shoes } = loadUserContext(false, true, false);
  const animation = chalkAnimation.neon("✅ Run logged successfully!");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  animation.stop();
  const distanceRan = parseFloat(
    validateDistance(
      await askQuestion("🏃‍♂️ How many kilometers did you run?    ")
    )
  );
  let selectedShoe = selShoes;

  if (distanceRan > 0) {
    if (!shoeData) {
      shoeData = loadShoeData();
    }

    if (!shoeData[selectedShoe.modelName]) {
      shoeData[selectedShoe.modelName] = {
        totalDistance: 0,
        durabilityLeft: selectedShoe.baseDurability,
        wearLevel: 0,
      };
      selectedShoe.wearLevel = 0;
    }

    const currentWearLevel =
      parseFloat(shoeData[selectedShoe.modelName].wearLevel) || 0;
    if (currentWearLevel >= 100) {
      console.log(
        chalk.red(
          `❌ Your ${selectedShoe.brand} ${selectedShoe.modelName} is fully worn out (wear level: ${currentWearLevel}%).`
        )
      );
      console.log(
        chalk.red(
          `Please select a different shoe using the 'recommend' command.`
        )
      );
      process.exit(0);
    }

    // Check if the run would exceed durability
    if (distanceRan > shoeData[selectedShoe.modelName].durabilityLeft) {
      console.log(
        chalk.red(
          `❌ You can't run ${distanceRan} km in your ${selectedShoe.brand} ${selectedShoe.modelName}.`
        )
      );
      console.log(
        chalk.red(
          `❌ Remaining durability is only ${
            shoeData[selectedShoe.modelName].durabilityLeft
          } km.`
        )
      );
      console.log(
        chalk.red(`Please select a different shoe or reduce the distance.`)
      );
      process.exit(0);
    }

    // Predict wearLevel after the run
    const predictedTotalDistance =
      shoeData[selectedShoe.modelName].totalDistance + distanceRan;
    const predictedDurabilityLeft = Math.max(
      0,
      shoeData[selectedShoe.modelName].durabilityLeft - distanceRan
    );
    const predictedWearLevel = PerformanceTracker.calculateWearLevel(
      predictedTotalDistance,
      predictedDurabilityLeft
    );

    if (predictedWearLevel >= 100 && predictedDurabilityLeft > 0) {
      console.log(
        chalk.red(
          `❌ Running ${distanceRan} km would fully wear out your ${
            selectedShoe.brand
          } ${
            selectedShoe.modelName
          } (predicted wear level: ${predictedWearLevel.toFixed(2)}%).`
        )
      );
      console.log(
        chalk.red(
          `Please select a different shoe or reduce the distance to ${
            shoeData[selectedShoe.modelName].durabilityLeft
          } km or less.`
        )
      );
      process.exit(0);
    }

    // Update shoeData
    shoeData[selectedShoe.modelName].totalDistance = predictedTotalDistance;
    shoeData[selectedShoe.modelName].durabilityLeft = predictedDurabilityLeft;
    shoeData[selectedShoe.modelName].wearLevel = predictedWearLevel.toFixed(2);
    selectedShoe.wearLevel = parseFloat(predictedWearLevel.toFixed(2));

    // Update shoe status
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
    tracker.logRun(
      profile,
      selectedShoe,
      distanceRan,
      profile.preferredTerrain
    );
    // Update data
    saveShoeData(shoeData);

    const recommendBasedOnWearLevel = await askQuestion(
      "Would you like to recommend shoes based on wear level? (yes/no) "
    );
    if (recommendBasedOnWearLevel.toLowerCase() === "yes") {
      console.log("\n📊 Recommending shoes based on wear level...");
      let updatedRank = RecommendationEngine.recommend(profile, shoes).filter(
        (r) => r.shoe.durabilityLeft > 0
      );

      // Display updated recommendations
      updatedRank.slice(0, 3).forEach((r, i) => {
        console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
        console.table(r.shoe);
      });

      // Append the selected shoe to the shoe data
      const newSelectedShoe = validateSelection(
        await askQuestion(
          "Which shoe would you like to select and save? (1, 2, or 3) "
        ),
        3
      );
      const index = parseInt(newSelectedShoe);
      // Save
      if (!isNaN(index) && index >= 1 && index <= 3 && updatedRank[index - 1]) {
        selectedShoe = updatedRank[index - 1].shoe;
        if (shoeData[selectedShoe.modelName]) {
          selectedShoe.wearLevel =
            parseFloat(shoeData[selectedShoe.modelName].wearLevel) || 0;
        } else {
          shoeData[selectedShoe.modelName] = {
            totalDistance: 0,
            durabilityLeft: selectedShoe.baseDurability,
            wearLevel: 0,
          };
        }
        saveJSON(`${profile.name}_selectedShoe.json`, selectedShoe);
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
      console.log("Running the run command again...");
      runAction(profile, selectedShoe);
    } else {
      console.log("Exiting the run command...");
      process.exit(0);
    }
  } else {
    console.log("❌ Invalid distance. Please enter a positive number.");
  }
}

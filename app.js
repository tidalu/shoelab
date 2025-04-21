// const inquirer = require('inquirer');
const readline = require("readline");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "data");
const loadExistingFiles = require("./utils/loadExistingUserData");

const ShoeFactory = require("./classes/ShoeFactory");
const AthleteProfile = require("./classes/AthleteProfile");
const PerformanceTracker = require("./classes/PerformanceTracker");
const RecommendationEngine = require("./classes/RecommendationEngine");
const { saveJSON, loadJSON } = require("./utils/FileManager");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function saveShoeData(data) {
  fs.writeFileSync("shoeData.json", JSON.stringify(data, null, 2), "utf-8");
}

function loadShoeData() {
  try {
    const data = fs.readFileSync("shoeData.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

function visualizeWearLevel(wearLevel) {
  const wearProgress = Math.min(wearLevel, 100);
  const barLength = 20;
  const progressBar = "█".repeat(Math.floor((wearProgress / 100) * barLength));
  const emptyBar = "░".repeat(barLength - progressBar.length);
  return `${progressBar}${emptyBar} ${wearProgress.toFixed(2)}%`;
}
(async () => {
  console.log("👟 Welcome to ShoeLab CLI!");

  let shoeData = loadShoeData();

  let profile = await loadExistingFiles();
  if (!profile) {
    const name = await askQuestion("👤 What's your name? ");
    const footSize = parseFloat(await askQuestion("📏 Your foot size (EU)? "));
    const preferredTerrain = await askQuestion(
      "🌍 Preferred terrain (trail/rocky/mud)? "
    );
    const activityLevel = await askQuestion(
      "🔥 Activity level (light/moderate/intense)? "
    );

    // const athlete = {
    //     name,
    //     footSize,
    //     preferredTerrain,
    //     activityLevel

    // }

    profile = new AthleteProfile(
      name,
      footSize,
      preferredTerrain,
      activityLevel,
      preferredTerrain === "trail" ? "RunningShoe" : "HikingBoot"
    );
  }

  console.log("\n🔧 Generating shoes...");

  const shoes = ShoeFactory.generateMany("RunningShoe", 5).concat(
    ShoeFactory.generateMany("HikingBoot", 5)
  );

  console.log("\n📊 Recommending shoes...");
  const ranked = RecommendationEngine.recommend(profile, shoes);
  console.log(ranked, "ranked shoes");
  ranked.slice(0, 3).forEach((r, i) => {
    console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
    console.table(r.shoe);
  });

  let selectedShoe;
  while (true) {
    const selectIndex = await askQuestion("Which shoe would you like to use (1, 2, or 3)? ");
    const index = parseInt(selectIndex);
  
    if (!isNaN(index) && index >= 1 && index <= 3 && ranked[index - 1]) {
      selectedShoe = ranked[index - 1].shoe;
      break;
    }
  
    console.log("❌ Invalid selection. Please enter 1, 2, or 3.");
  }
  console.log(
    `\n👟 You selected: ${selectedShoe.brand} ${selectedShoe.modelName}`
  );

  if (!shoeData[selectedShoe.modelName]) {
    shoeData[selectedShoe.modelName] = {
      totalDistance: 0,
      durabilityLeft: selectedShoe.durabilityLeft,
      wearLevel: 0,
    };
  }

  const distanceRan = parseFloat(
    await askQuestion("🏃‍♂️ How many kilometers did you run? ")
  );

  // update data
  shoeData[selectedShoe.modelName].totalDistance += distanceRan;
  shoeData[selectedShoe.modelName].durabilityLeft -= distanceRan;

  // calculate wearlevel and durability of the selected shoe for the user

  const wearLevel =
    (shoeData[selectedShoe.modelName].totalDistance /
      selectedShoe.durabilityLeft) *
    100;
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

  saveShoeData(shoeData);

  // based oint eh wear level
  console.log("\n📊 Recommending shoes based on wear level...");
  const updatedRank = RecommendationEngine.recommend(profile, shoes).filter(
    (r) => r.shoe.durabilityLeft > 0
  );

  // display updated recommendations
  updatedRank.slice(0, 3).forEach((r, i) => {
    console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
    console.table(r.shoe);
  });

  const trackAnotherRun = await askQuestion(
    "Would you like to track another run? (yes/no) "
  );
  if (trackAnotherRun.toLowerCase() === "yes") {
    // repet the process for the user if he wants to track another run
    await (async () => {
      let totalDistanceRan = parseFloat(
        await askQuestion(
          `How many kilometers did you run in your ${selectedShoe.brand} ${selectedShoe.modelName}? `
        )
      );

      shoeData[selectedShoe.modelName].totalDistance += totalDistanceRan;
      shoeData[selectedShoe.modelName].durabilityLeft -= totalDistanceRan;

      // wearlevel update
      const wearLevel =
        (shoeData[selectedShoe.modelName].totalDistance /
          selectedShoe.durabilityLeft) *
        100;
      shoeData[selectedShoe.modelName].wearLevel = wearLevel.toFixed(2);

      console.log(
        `🏃‍♂️ You ran ${totalDistanceRan} km in your ${selectedShoe.brand} ${selectedShoe.modelName}.`
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

      saveShoeData(shoeData);
    })();
  }


  const wantToDelete =  await askQuestion(
    "Do you want to delete a shoe from your data? (yes/no) "
  );
  if(wantToDelete.toLowerCase() === "yes") {
    const allModels = Object.keys(shoeData);

    if(allModels.length === 0) {
      console.log("No shoes to delete.");
    } else {
        console.log("\n📂 Shoes available for deletion:")
        allModels.forEach((model, i) => {
            console.log(`${i + 1}. ${model}`);
        });

        const deleteIndex = await askQuestion("Enter the number of the shoe to delete: ");
        const index = parseInt(deleteIndex);

        if (!isNaN(index) && allModels[index - 1]) {
            const deletedModel = allModels[index - 1];
            delete shoeData[deletedModel];
            console.log(`🗑️ Deleted shoe: ${deletedModel}`);
            saveShoeData(shoeData);
          } else {
            console.log("❌ Invalid selection. No shoe deleted.");
          }

    }
}
  rl.close();
  const finalName = profile.name;
  saveJSON(`${finalName}_profile.json`, profile);
  saveJSON(`${finalName}_selectedShoe.json`, selectedShoe);

  console.log(`\n📁 Saved your profile and selected shoe for ${finalName}.`);
  console.log("\n✅ Done. Thanks for using ShoeLab!");
})();

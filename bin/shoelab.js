#!/usr/bin/env node

const {Command }= require("commander");
const readline = require('readline')
const chalk = require('chalk');
const fs = require('fs')
const path = require('path')
const dataPath = path.join(__dirname, '../data')
const ShoeFactory = require("../classes/ShoeFactory");
const AthleteProfile = require("../classes/AthleteProfile");
const PerformanceTracker = require("../classes/PerformanceTracker");
const RecommendationEngine = require("../classes/RecommendationEngine");
const { saveJSON, loadJSON } = require("../utils/FileManager");
const { askQuestion } = require("../utils/askQuestion")
const loadExistingFiles = require("../utils/loadExistingUserData")
const loadShoeData = require("../utils/LoadShoeData")


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
    console.log(chalk.blue("👟 Welcome to ShoeLab CLI!"));



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
    
        profile = new AthleteProfile(
          name,
          footSize,
          preferredTerrain,
          activityLevel,
          preferredTerrain === "trail" ? "RunningShoe" : "HikingBoot"
        );

    }
    // save 
    finalName = profile.name 
    saveJSON(`${finalName}_profile.json`, profile);
    console.log(`Profile created for ${finalName}`);
    process.exit(0);
  });

program
  .command("generate")
  .description("Generate shoes")
  .action(async () =>{
    console.log("\n🔧 Generating shoes...");

    shoes = ShoeFactory.generateMany("RunningShoe", 5).concat(
        ShoeFactory.generateMany("HikingBoot", 5)
      );

    
      console.log(chalk.green("Shoes generated successfully!"));

    const showShoeList = await askQuestion("Would you like to see the generated shoes? (yes/no) ");
    if (showShoeList.toLowerCase() === "yes") {
        console.log("Generated Shoes:");
        shoes.forEach((shoe, i) => {
            console.log(`#${i + 1} - ${shoe.brand} ${shoe.modelName}`);
          });
    }
    const saveShoeList = await askQuestion("Would you like to save the generated shoes? (yes/no) ");
    if (saveShoeList.toLowerCase() === "yes") {
        const shoeList = shoes.map((shoe) => shoe.getDetailedInfo());
        saveJSON(`${finalName}_shoes.json`, shoeList);
        console.log(chalk.green("Shoes saved successfully!"));
    }
    console.log(chalk.blue("You can now use the 'recommend' command to get shoe recommendations."));
    process.exit(0);
  });


program
  .command("recommend")
  .description("Recommend shoes")
  .action(async () => {
    console.log("\n📊 Recommending shoes...")
    const ranked = RecommendationEngine.recommend(profile, shoes);
//   console.log(ranked, "ranked shoes");
  ranked.slice(0, 3).forEach((r, i) => {
    console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
    console.table(r.shoe);
  });


    while (true) {
        const selectIndex = await askQuestion("Which shoe would you like to use (1, 2, or 3)? ");
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
    if (!shoeData[selectedShoe.modelName]) {
        shoeData[selectedShoe.modelName] = {
          totalDistance: 0,
          durabilityLeft: selectedShoe.durabilityLeft,
          wearLevel: 0,
        };
      }
  });

program
  .command("run")
  .description("Log a run")
  .action(async () =>{
    console.log(chalk.green("Run logged successfully!"));
    const distanceRan = parseFloat(
        await askQuestion("🏃‍♂️ How many kilometers did you run? ")
      );
    
      if (distanceRan > 0) {
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
        saveJSON(dataPath, shoeData);


        const recommendBasedOnWearLevel =await askQuestion(
          "Would you like to recommend shoes based on wear level? (yes/no) "
        );
        if (recommendBasedOnWearLevel.toLowerCase() === "yes") {
            console.log("\n📊 Recommending shoes based on wear level...");
            const updatedRank = RecommendationEngine.recommend(profile, shoes).filter(
              (r) => r.shoe.durabilityLeft > 0
            );
          
            // display updated recommendations
            updatedRank.slice(0, 3).forEach((r, i) => {
              console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
              console.table(r.shoe);
            });

            
        } else {
          console.log("No recommendations made.");
        }

        const trackAnotherRun = await askQuestion(
            "Would you like to track another run? (yes/no) "
            );
        if (trackAnotherRun.toLowerCase() === "yes") {
            console.log("Tracking another run...");
            
            // run command action again
            program.commands.find(cmd => cmd.name() === 'run').action();
        }
      } else {
        console.log("❌ Invalid distance. Please enter a positive number.");
      }
  });

program
  .command("delete")
  .description("Delete a shoe")
  .action(async () =>{
    const wantToDelete = await askQuestion("Do you want to delete a shoe? (yes/no) ");
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
  });


  // end words 
    program
    .command("exit")
    .description("Exit the application")
    .action(() => {
        console.log(`\n📁 Saved your profile and selected shoe for ${profile.name}.`);
  console.log("\n✅ Done. Thanks for using ShoeLab!");
        process.exit(0);
    });

program.parse(process.argv);
// const inquirer = require('inquirer');
const readline = require('readline');
const chalk = require('chalk');

const ShoeFactory = require('./classes/ShoeFactory');
const AthleteProfile = require('./classes/AthleteProfile');
const PerformanceTracker = require('./classes/PerformanceTracker');
const RecommendationEngine = require('./classes/RecommendationEngine');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const shoeData = {

}


function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    })
}

function visualizeWearLevel(wearLevel) {
    const wearProgress = Math.min(wearLevel, 100)
    const barLength = 20; 
    const progressBar = '█'.repeat(Math.floor((wearProgress / 100) * barLength));
    const emptyBar = '░'.repeat(barLength - progressBar.length);
    return `${progressBar}${emptyBar} ${wearProgress.toFixed(2)}%`;
}
(async () => {
    console.log("👟 Welcome to ShoeLab CLI!");

    const name = await askQuestion("👤 What's your name? ");
    const footSize = parseFloat(await askQuestion("📏 Your foot size (EU)? "));
    const preferredTerrain = await askQuestion("🌍 Preferred terrain (trail/rocky/mud)? ");
    const activityLevel = await askQuestion("🔥 Activity level (light/moderate/intense)? ");


    // const athlete = {
    //     name,
    //     footSize, 
    //     preferredTerrain, 
    //     activityLevel

    // }



    const profile = new AthleteProfile(
        name,
        footSize, 
        preferredTerrain, 
        activityLevel,
        'RunningShoe'
    );

    console.log('\n🔧 Generating shoes...')

    const shoes = ShoeFactory.generateMany('RunningShoe', 5).concat(ShoeFactory.generateMany('HikingBoot', 5))

    console.log("\n📊 Recommending shoes...")
    const ranked = RecommendationEngine.recommend(profile, shoes)
    console.log(ranked, "ranked shoes")
    ranked.slice(0, 3).forEach((r, i) => {
        console.log(`\n#${i + 1} 🥇 Score: ${r.score}`)
        console.table(r.shoe)
    })


    const selectIndex = await askQuestion("Which shoe would you like to use (1, 2, or 3)? ");
    const selectedShoe = ranked[parseInt(selectIndex) - 1].shoe;

    
    console.log(`\n👟 You selected: ${selectedShoe.brand} ${selectedShoe.modelName}`);
    

    if (!shoeData[selectedShoe.modelName]) {
        shoeData[selectedShoe.modelName] = {
            totalDistance: 0,
            durabilityLeft: selectedShoe.durabilityLeft,
            wearLevel: 0,
        };
    }
    
    const distanceRan = parseFloat(await askQuestion("🏃‍♂️ How many kilometers did you run? "));

      // update data 
      shoeData[selectedShoe.modelName].totalDistance += distanceRan;
      shoeData[selectedShoe.modelName].durabilityLeft -= distanceRan;
    
    // calculate wearlevel and durability of the selected shoe for the user 

    const wearLevel =(shoeData[selectedShoe.modelName].totalDistance / selectedShoe.durabilityLeft) * 100;
    shoeData[selectedShoe.modelName].wearLevel = wearLevel.toFixed(2);


    // updateed shoe status
    console.log(`\n🏃‍♂️ You ran ${distanceRan} km in your ${selectedShoe.brand} ${selectedShoe.modelName}.`);
    console.log(`🔧 New durability left: ${shoeData[selectedShoe.modelName].durabilityLeft} km`);
    console.log(`💥 Current wear level: ${visualizeWearLevel(shoeData[selectedShoe.modelName].wearLevel)}`);

    // based oint eh wear level
    console.log("\n📊 Recommending shoes based on wear level...")
    const updatedRank =  RecommendationEngine.recommend(profile, shoes).filter(r => r.shoe.durabilityLeft > 0)

     // display updated recommendations
     updatedRank.slice(0, 3).forEach((r, i) => {
        console.log(`\n#${i + 1} 🥇 Score: ${r.score}`);
        console.table(r.shoe);
    });
    

    const trackAnotherRun = await askQuestion("Would you like to track another run? (yes/no) ");
    if (trackAnotherRun.toLowerCase() === 'yes') {
        // repet the process for the user if he wants to track another run
        await (async () => {
            let totalDistanceRan = parseFloat(await askQuestion(`How many kilometers did you run in your ${selectedShoe.brand} ${selectedShoe.modelName}? `));
            
            shoeData[selectedShoe.modelName].totalDistance += totalDistanceRan;
            shoeData[selectedShoe.modelName].durabilityLeft -= totalDistanceRan;
    
            // wearlevel update
            const wearLevel = (shoeData[selectedShoe.modelName].totalDistance / selectedShoe.durabilityLeft) * 100;
            shoeData[selectedShoe.modelName].wearLevel = wearLevel.toFixed(2);
    
            console.log(`🏃‍♂️ You ran ${totalDistanceRan} km in your ${selectedShoe.brand} ${selectedShoe.modelName}.`);
            console.log(`🔧 New durability left: ${shoeData[selectedShoe.modelName].durabilityLeft} km`);
            console.log(`💥 Current wear level: ${visualizeWearLevel(shoeData[selectedShoe.modelName].wearLevel)}`);
        })();
    }
    
    
    rl.close();
    console.log("\n✅ Done. Thanks for using ShoeLab!");
})()
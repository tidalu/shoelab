// const inquirer = require('inquirer');
const readline = require('readline');

const ShoeFactory = require('./classes/ShoeFactory');
const AthleteProfile = require('./classes/AthleteProfile');
const PerformanceTracker = require('./classes/PerformanceTracker');
const RecommendationEngine = require('./classes/RecommendationEngine');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    })
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
    
    rl.close();

    console.log(`\n👟 You selected: ${selectedShoe.brand} ${selectedShoe.modelName}`);
    console.log("\n✅ Done. Thanks for using ShoeLab!");
})()
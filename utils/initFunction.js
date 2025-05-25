const chalk = require("chalk");
const { askQuestion } = require("./askQuestion");
const {
  validateFootSize,
  validateActivityLevel,
} = require("./inputValidation");
const AthleteProfile = require("../classes/AthleteProfile");
const { saveJSON } = require("./FileManager");

async function initFunction() {
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

  // save
  finalName = profile.name;
  saveJSON(`${finalName}_profile.json`, profile);
  saveJSON("activeUser.json", { name: finalName });
  console.log(`Profile created for ${finalName}`);

  process.exit(0);
}

module.exports = initFunction;

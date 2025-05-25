const fs = require("fs");
const path = require("path");

const { askQuestion } = require("./askQuestion.js");
const AthleteProfile = require("../classes/AthleteProfile.js");
const { loadJSON } = require("./FileManager.js");
const initFunction = require("./initFunction.js");
const chalk = require("chalk");
const ora = require("ora");

const dataPath = path.join(__dirname, "../data");

async function LoadExistingFiles() {
  const existingFiles = fs
    .readdirSync(dataPath)
    .filter((file) => file.endsWith("_profile.json"));
  if (existingFiles.length === 0) return initFunction();

  console.log(chalk.bgGray.white.bold("\n📂 Existing profiles found:"));

  existingFiles.forEach((file, i) =>
    console.log(chalk.blue(`${i + 1}. ${file.replace("_profile.json", "")}`))
  );

  const index = await askQuestion(
    "\n🔁 Load a profile? Enter number or press Enter to skip: "
  );
  if (!index) return null;
  else if (!isNaN(index)) {
    const name = existingFiles[parseInt(index) - 1].replace(
      "_profile.json",
      ""
    );

    const spinner = ora(
      chalk.blue(`🔍 Loading profile for ${name}...`)
    ).start();
    await new Promise((r) => setTimeout(r, 1000));
    const profile = loadJSON(`${name}_profile.json`);
    spinner.succeed(chalk.green(`✅ Profile for ${name} loaded successfully!`));
    return new AthleteProfile(
      profile.name,
      profile.footSize,
      profile.preferredTerrain,
      profile.activityLevel,
      profile.preferredType
    );
  } else {
    console.log(
      "❌ Invalid input. Looks like you don't have a profile. so we should create one."
    );
    return null;
  }
}

module.exports = LoadExistingFiles;

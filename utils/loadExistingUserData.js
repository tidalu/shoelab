const fs = require("fs");
const path = require("path");

const { askQuestion } = require("./askQuestion.js");
const AthleteProfile = require("../classes/AthleteProfile.js");
const { loadJSON } = require("./FileManager.js");

const dataPath = path.join(__dirname, "../data");

async function LoadExistingFiles() {
  const existingFiles = fs
    .readdirSync(dataPath)
    .filter((file) => file.endsWith("_profile.json"));
  if (existingFiles.length === 0) return null;

  console.log("\n📂 Existing profiles found:");

  existingFiles.forEach((file, i) =>
    console.log(`${i + 1}. ${file.replace("_profile.json", "")}`)
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
    const profile = loadJSON(`${name}_profile.json`);
    return new AthleteProfile(
      profile.name,
      profile.footSize,
      profile.preferredTerrain,
      profile.activityLevel,
      profile.preferredType
    );
  } else {
    console.log("❌ Invalid input. Please enter a number.");
    return null;
  }
}

module.exports = LoadExistingFiles;

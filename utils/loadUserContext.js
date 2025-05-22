const { loadJSON } = require("./FileManager");
const  reviveShoes  = require("./reviveShoes");
const AthleteProfile = require("../classes/AthleteProfile");
const chalk = require("chalk");

function loadUserContext(requireProfile = true, requireShoes = false, requireSelectedShoe = false) {
  // active usr
  const activeUser = loadJSON("activeUser.json");
  if (!activeUser) {
    throw new Error("No active user found. Please run `init` first.");
  }

  // profile
  let profile = null;
  if (requireProfile) {
    profile = loadJSON(`${activeUser.name}_profile.json`);
    if (!profile) {
      throw new Error(`Couldn't load profile for ${activeUser.name}. Run \`init\` first.`);
    }
    profile = new AthleteProfile(
      profile.name,
      profile.footSize,
      profile.preferredTerrain,
      profile.activityLevel,
      profile.preferredShoeType
    );
  }

  // shoes
  let shoes = [];
  if (requireShoes) {
    shoes = reviveShoes(loadJSON(`${activeUser.name}_shoes.json`));
    if (!shoes || shoes.length === 0) {
      console.log(chalk.red("No saved shoes found. Please run `generate` first."));
      process.exit(1);
    }
  }

  // selected shoe
  let selectedShoe = null;
  if (requireSelectedShoe) {
    selectedShoe = reviveShoes(loadJSON(`${activeUser.name}_selectedShoe.json`));
    if (!selectedShoe) {
      console.log(chalk.red("No selected shoe found. Please run `recommend` first."));
      process.exit(1);
    } else if(selectedShoe.wearLevel >= 100) {
      console.log(chalk.yellow("Selected shoe is worn out. Please run `generate` first."));
      process.exit(1);
    } else if(!selectedShoe.wearLevel ) {
      selectedShoe.wearLevel = 0;
    }
  }

  return {
    activeUser,
    profile,
    shoes,
    selectedShoe
  };
}

module.exports = { loadUserContext };
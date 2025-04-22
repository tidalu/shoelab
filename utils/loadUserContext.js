const { loadJSON } = require("./FileManager");
const  reviveShoes  = require("./reviveShoes");
const AthleteProfile = require("../classes/AthleteProfile");

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
  let shoes = null;
  if (requireShoes) {
    shoes = reviveShoes(loadJSON(`${activeUser.name}_shoes.json`));
    if (!shoes || shoes.length === 0) {
      throw new Error("No saved shoes found. Please run `generate` first.");
    }
  }

  // selected shoe
  let selectedShoe = null;
  if (requireSelectedShoe) {
    selectedShoe = reviveShoes(loadJSON(`${activeUser.name}_selectedShoe.json`));
    if (!selectedShoe) {
      throw new Error("No selected shoe found. Please run `recommend` first.");
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
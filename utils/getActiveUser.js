const { loadJSON } = require("./FileManager");
const reviveShoes = require("./reviveShoes");

function activeUser() {

    const user = loadJSON("activeUser.json");
    if (!user) {
        console.log("❌ No active user found. Please run `init` first.");
        process.exit(1);
    }
    
    return user;
    
}

function getActiveUserShoes() {
    const user = activeUser();
    const finalName = user.name;
    const savedShoes = reviveShoes(loadJSON(`${finalName}_shoes.json`));
    if (!savedShoes || savedShoes.length === 0) {
        console.log("❌ No saved shoes found. Please run `generate` first.");
        process.exit(1);
    }
    
    return savedShoes;
}

function getActiveUserSelectedShoe() {
    const user = activeUser();
    const finalName = user.name;
    const selectedShoe = reviveShoes(loadJSON(`${finalName}_selectedShoe.json`));
    if (!selectedShoe) {
        console.log("❌ No selected shoe found. Please run `recommend` first.");
        process.exit(1);
    }
    
    
    return selectedShoe;
}



function getActiveUserProfile() {
    const user = activeUser();
    const profile = loadJSON(`${user.name}_profile.json`);
    if (!profile) {
        console.log(`❌ Couldn't load profile for ${user.name}. Run init first.`);
        process.exit(1);
    }

    return profile;
}

module.exports = {
    getActiveUserProfile,
    getActiveUserShoes,
    getActiveUserSelectedShoe,
    activeUser
};
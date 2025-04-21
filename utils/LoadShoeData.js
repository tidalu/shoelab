const fs = require("fs");


function loadShoeData() {
  try {
    const data = fs.readFileSync("shoeData.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

module.exports = loadShoeData;
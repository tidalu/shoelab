const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function saveJSON(filename, data, update = false) {
  if (update) {
    const existingData = loadJSON(filename);
    if (existingData) {
      data = [...existingData, ...data];
    }
  }

  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function loadJSON(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

module.exports = {
  saveJSON,
  loadJSON,
};

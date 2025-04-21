const fs = require("fs");
const path = require("path");

const { activeUser } = require("../utils/getActiveUser.js");

function getUserShoeDataPath() {
  const user = activeUser();
  return path.join(__dirname, `../data/${user.name}_userShoeData.json`);
}

function loadShoeData() {
  const filePath = getUserShoeDataPath();
  if (!fs.existsSync(filePath)) return {};
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return data;
}

function saveShoeData(newData) {
  const filePath = getUserShoeDataPath();
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
}

module.exports = {
  loadShoeData,
  saveShoeData,
};

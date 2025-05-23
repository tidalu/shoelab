const { saveJSON, loadJSON } = require("../utils/FileManager");
const { loadShoeData } = require("../utils/LoadShoeData");
const { loadUserContext } = require("../utils/loadUserContext");

class PerformanceTracker {
  constructor() {
    const { activeUser } = loadUserContext(false, false, false);
    this.activeUser = activeUser.name;
    this.logs = this.loadLogs();
  }

  static calculateWearLevel(totalDistance, durabilityLeft) {
    if (durabilityLeft <= 0) {
      return 100;
    }
    return (totalDistance / (totalDistance + durabilityLeft)) * 100;
  }

  static trackRun(shoeData, selectedShoe, distanceRan) {
    if (!shoeData[selectedShoe.modelName]) {
      shoeData[selectedShoe.modelName] = {
        totalDistance: 0,
        durabilityLeft: selectedShoe.durabilityLeft,
        wearLevel: 0,
      };
    }
    shoeData[selectedShoe.modelName].totalDistance += distanceRan;
    shoeData[selectedShoe.modelName].durabilityLeft = Math.max(
      0,
      shoeData[selectedShoe.modelName].durabilityLeft - distanceRan
    );

    const wearLevel = PerformanceTracker.calculateWearLevel(
      shoeData[selectedShoe.modelName].totalDistance,
      shoeData[selectedShoe.modelName].durabilityLeft
    );
    shoeData[selectedShoe.modelName].wearLevel = wearLevel.toFixed(2);
    selectedShoe.wearLevel = wearLevel.toFixed(2);
    

    return shoeData;
  }

  //get logs from the file
  loadLogs(name) {
    let logs = loadJSON(`${name ?  name : this.activeUser}_logs.json`);
    // if file is not present, create it
    if (!logs) {
      saveJSON(`${name ?  name : this.activeUser}_logs.json`, [], true);
      return [];
    }
    return logs.map((log) => ({
      ...log,
      timestamp: new Date(log.timestamp),
    }));
  }
  setLogs(logs = [], name) {

    // when file is not present, create it
    saveJSON(`${name? name : this.activeUser}_logs.json`, logs, true);
  }

  logRun(athlete, shoe, distance, terrain) {
    // load shoe data

    const shoeData = loadShoeData();
    const wearLevel =
      parseFloat(shoeData[shoe.modelName]?.wearLevel) || shoe.wearLevel || 0;
    const entry = {
      athleteName: athlete.name,
      shoeType: shoe.constructor.name,
      shoeModel: shoe.modelName,
      terrain: terrain,
      activityLevel: athlete.activityLevel,
      distance: distance,
      wearLevel: wearLevel,
      comfortScore: shoe.getComfortScore().toFixed(2),
      timestamp: new Date(),
    };

    this.logs.push(entry);
    this.setLogs(entry, athlete.name);
  }

  getRunStats() {
    // get log data
    let logData = this.loadLogs();
    const totalDistance = logData.reduce((sum, log) => sum + log.distance, 0);
    const runsByShoe = {};
    logData.forEach((log) => {
      if (!runsByShoe[log.shoeModel]) {
        runsByShoe[log.shoeModel] = {
          totalDistance: 0,
          runs: 0,
          wearLevel: parseFloat(log.wearLevel),
        };
      }
      runsByShoe[log.shoeModel].totalDistance += log.distance;
      runsByShoe[log.shoeModel].runs += 1;
      runsByShoe[log.shoeModel].wearLevel = parseFloat(log.wearLevel);
    });

    return {
      totalDistance,
      runsByShoe,
      runLogs: logData,
    };
  }

  simulateAndTrack(athlete, shoe, steps = 10) {
    for (let i = 0; i < steps; i++) {
      athlete.simulateActivity(shoe, 1);
      this.logStep(athlete, shoe, i + 1);
    }
  }

  getLogs(name) {
    return this.loadLogs(name ? name : this.activeUser);
  }

  printLogs(name) {
    console.table(this.loadLogs(name ? name : this.activeUser), [
      "athleteName",
      "shoeType",
      "shoeModel",
      "terrain",
      "activityLevel",
      "distance",
      "wearLevel",
      "comfortScore",
      "timestamp",
    ]);
  }
}

module.exports = PerformanceTracker;

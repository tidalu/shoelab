class PerformanceTracker {
  constructor() {
    this.logs = this.loadLogs();
  }

  static calculateWearLevel(totalDistance, durabilityLeft) {
    if (durabilityLeft <= 0) {
      return 100;
    }
    return Math.min(
      100,
      (totalDistance / (totalDistance + durabilityLeft)) * 100
    );
  }
  // TODO:  we have implemented the stats by actaully getting logs from a tracker file, because PerformanceTracker removes the logs, os we should have persistent data for the stats, so we should have separate file for the stats for each user, implement this, and change the code accordingly

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
  }

  logRun(athlete, shoe, distance, terrain) {
    console.log("saved successfully");
    this.logs.push({
      athleteName: athlete.name,
      shoeType: shoe.constructor.name,
      shoeModel: shoe.modelName,
      terrain: terrain,
      activityLevel: athlete.activityLevel,
      distance: distance,
      wearLevel: shoe.wearLevel.toFixed(2),
      comfortScore: shoe.getComfortScore().toFixed(2),
      timestamp: new Date(),
    });
    console.log(this.logs, " saved logs");
  }

  getRunStats() {
    const totalDistance = this.logs.reduce((sum, log) => sum + log.distance, 0);
    const runsByShoe = {};
    this.logs.forEach((log) => {
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
      runLogs: this.logs,
    };
  }

  simulateAndTrack(athlete, shoe, steps = 10) {
    for (let i = 0; i < steps; i++) {
      athlete.simulateActivity(shoe, 1);
      this.logStep(athlete, shoe, i + 1);
    }
  }

  getLogs() {
    return this.logs;
  }

  printLogs() {
    console.table(this.logs, [
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

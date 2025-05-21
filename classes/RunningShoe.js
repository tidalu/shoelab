const Shoe = require("./Shoe.js");

class RunningShoe extends Shoe {
  constructor(
    brand,
    modelName,
    size,
    material,
    baseDurability = 100,
    cushioningLevel
  ) {
    super(brand, modelName, size, material, baseDurability);
    this.cushioningLevel = cushioningLevel;
  }

  simulateStep({ terrain = "track", intensity = 1 }) {
    let wearMultiplier;

    switch (terrain) {
      case "road":
        wearMultiplier = 1.2;
        break;
      case "trail":
        wearMultiplier = 1.5;
        break;
      case "track":
        wearMultiplier = 1.0;
        break;
      default:
        wearMultiplier = 1.0;
        break;
    }

    const cushionFactor =
      {
        low: 1.1,
        medium: 1.0,
        high: 0.9,
      }[this.cushioningLevel] || 1.0;

    const wearAdded = intensity * wearMultiplier * cushionFactor * 2;
    this.wearLevel += Math.min(100, this.wearLevel + wearAdded);
  }

  getComfortScore() {
    let cushioningBonus = 0;
    switch (this.cushioningLevel) {
      case "High":
        cushioningBonus = 20;
        break;
      case "Medium":
        cushioningBonus = 10;
        break;
      case "Low":
        cushioningBonus = 0;
        break;
    }
    return this.getRemainingDurability() + cushioningBonus;
  }

  getDetailedInfo() {
    return {
      ...this.getBasicInfo(),
      type: "RunningShoe",
      cushioningLevel: this.cushioningLevel,
      comfortScore: this.getComfortScore(),
      wearLevel: this.wearLevel.toFixed(2),
    };
  }
}

module.exports = RunningShoe;

const Shoe = require("./Shoe.js");

class HikingBoot extends Shoe {
  constructor(
    brand,
    modelName,
    size,
    material,
    baseDurability = 100,
    ankleSupport = true
  ) {
    super(brand, modelName, size, material, baseDurability);
    this.ankleSupport = ankleSupport;
  }

  simulateStep({ terrain = "rocky", intensity = 1 }) {
    let wearMultiplier;

    switch (terrain) {
      case "rocky":
        wearMultiplier = 1.5;
        break;
      case "mud":
        wearMultiplier = 1.3;
        break;
      case "trail":
        wearMultiplier = 1.0;
        break;
      default:
        wearMultiplier = 1.0;
        break;
    }

    const toughnessFactor = 0.7;

    const wearAdded = intensity * wearMultiplier * toughnessFactor * 2.5;
    this.wearLevel = Math.min(100, this.wearLevel + wearAdded);
  }

  getComfortScore() {
    const wearImpact = this.wearLevel * 0.4;
    const baseComfort = this.ankleSupport ? 60 : 50;

    return Math.max(0, baseComfort - wearImpact);
  }

  getDetailedInfo() {
    return {
      ...this.getBasicInfo(),
      type: this.constructor.name,
      ankleSupport: this.ankleSupport,
      comfortScore: this.getComfortScore(),
      wearLevel: this.wearLevel.toFixed(2),
    };
  }
}

module.exports = HikingBoot;

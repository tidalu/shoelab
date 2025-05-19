class Shoe {
  static totalShoesCreated = 0;

  constructor(brand, modelName, size, material, baseDurability) {
    if (new.target === Shoe) {
      throw new Error("Cannot instantiate abstract class Shoe directly.");
    }

    this.brand = brand;
    this.modelName = modelName;
    this.size = size;
    this.material = material;
    this.baseDurability = baseDurability;
    this.wearLevel = 100 - (this.durabilityLeft / this.baseDurability) * 100;
    this.durabilityLeft = Math.floor(Math.random() * this.baseDurability);

    Shoe.totalShoesCreated++;
  }

  isWornOut() {
    return this.wearLevel >= 100;
  }

  getRemainingDurability() {
    return Math.max(
      this.baseDurability - this.baseDurability * (this.wearLevel / 100)
    );
  }
  simulateStep(envFactors) {
    throw new Error("simulateStep method must be implemented in subclasses.");
  }

  getComfortScore() {
    throw new Error(
      "getComfortScore method must be implemented in subclasses."
    );
  }

  getBasicInfo() {
    return {
      brand: this.brand,
      modelName: this.modelName,
      size: this.size,
      material: this.material,
      durabilityLeft: this.getRemainingDurability(),
      wornOut: this.isWornOut(),
    };
  }
}

module.exports = Shoe;

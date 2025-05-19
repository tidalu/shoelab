const reviveShoes = require("../utils/reviveShoes");
const RunningShoe = require("../classes/RunningShoe");
const HikingBoot = require("../classes/HikingBoot");

describe("reviveShoes", () => {
  test("should revive a single RunningShoe", () => {
    const shoeData = {
      type: "RunningShoe",
      brand: "Nike",
      modelName: "Air Max",
      size: 42,
      material: "Mesh",
      durabilityLeft: 100,
      cushioningLevel: "High",
      wearLevel: "10.0",
    };
    const revivedShoe = reviveShoes(shoeData);
    expect(revivedShoe).toBeInstanceOf(RunningShoe);
    expect(revivedShoe.brand).toBe("Nike");
    expect(revivedShoe.modelName).toBe("Air Max");
    expect(revivedShoe.size).toBe(42);
    expect(revivedShoe.material).toBe("Mesh");
    expect(revivedShoe.durabilityLeft).toBe(100);
    expect(revivedShoe.cushioningLevel).toBe("High");
    expect(revivedShoe.wearLevel).toBeCloseTo(10.0);
  });

  test("should revive a single HikingBoot", () => {
    const shoeData = {
      type: "HikingBoot",
      brand: "Salomon",
      modelName: "Quest",
      size: 42,
      material: "Gore-Tex",
      durabilityLeft: 150,
      ankleSupport: true,
      wearLevel: "5.0",
    };
    const revived = reviveShoes(shoeData);
    expect(revived).toBeInstanceOf(HikingBoot);
    expect(revived.brand).toBe("Salomon");
    expect(revived.modelName).toBe("Quest");
    expect(revived.size).toBe(42);
    expect(revived.material).toBe("Gore-Tex");
    expect(revived.durabilityLeft).toBe(150);
    expect(revived.ankleSupport).toBe(true);
    expect(revived.wearLevel).toBeCloseTo(5.0);
  });

  test("should revive an array of shoes", () => {
    const shoeArray = [
      {
        type: "RunningShoe",
        brand: "Nike",
        modelName: "Air Max",
        size: 42,
        material: "Mesh",
        durabilityLeft: 100,
        cushioningLevel: "High",
        wearLevel: "10.00",
      },
      {
        type: "HikingBoot",
        brand: "Salomon",
        modelName: "Quest",
        size: 42,
        material: "Gore-Tex",
        durabilityLeft: 150,
        ankleSupport: true,
        wearLevel: "5.00",
      },
    ];
    const revivedShoes = reviveShoes(shoeArray);
    expect(revivedShoes).toHaveLength(2);
    expect(revivedShoes[0]).toBeInstanceOf(RunningShoe);
    expect(revivedShoes[1]).toBeInstanceOf(HikingBoot);
    expect(revivedShoes[0].brand).toBe("Nike");
    expect(revivedShoes[1].brand).toBe("Salomon");
  });

  test("should return null for unknown shoe type", () => {
    const shoeData = {
      type: "UnknownShoe",
      brand: "Nike",
      modelName: "Air Max",
      size: 42,
      material: "Mesh",
      durabilityLeft: 100,
      cushioningLevel: "High",
      wearLevel: "10.00",
    };
    console.warn = jest.fn();
    const revivedShoe = reviveShoes(shoeData);
    expect(revivedShoe).toBeNull();
    expect(console.warn).toHaveBeenCalledWith("Unknown shoe type");
  });
});

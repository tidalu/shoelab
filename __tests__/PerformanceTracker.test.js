const PerformanceTracker = require("../classes/PerformanceTracker");
const RunningShoe = require("../classes/RunningShoe");
const AthleteProfile = require("../classes/AthleteProfile");

describe("PerformanceTracker", () => {
  let tracker, athlete, shoe, shoeData;

  beforeEach(() => {
    tracker = new PerformanceTracker();
    athlete = new AthleteProfile(
      "Kacper",
      42,
      "trail",
      "moderate",
      "RunningShoe"
    );
    shoe = new RunningShoe("Nike", "Air Max", 44, "Mesh", 150, "High");
    shoeData = {};
  });

  test("calculateWearLevel should compute wear level based on distance correctly", () => {
    const wearLevel = PerformanceTracker.calculateWearLevel(50, 100);
    expect(wearLevel.toFixed(2)).toBe(String(33.33), 2);
  });

  test("calculateWearLevel should cap at 100 percent for zero durability", () => {
    const wearLevel = PerformanceTracker.calculateWearLevel(150, 0);
    expect(wearLevel).toBe(100);
  });

  test("trackRUn should update the shoe data correctly", () => {
    PerformanceTracker.trackRun(shoeData, shoe, 10);
    expect(shoeData["Air Max"]).toEqual({
      totalDistance: 10,
      durabilityLeft: expect.any(Number),
      wearLevel: expect.any(String),
    });
    expect(parseFloat(shoeData["Air Max"].wearLevel)).toBeGreaterThan(0);
  });

  
});


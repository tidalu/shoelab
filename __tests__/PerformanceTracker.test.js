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

  test("logRun should store the run data with timeStamp", () => {
    tracker.logRun(athlete, shoe, 5, "trail");
    const log = tracker.getLogs()[0];
    expect(log).toMatchObject({
      athleteName: "Kacper",
      shoeType: "RunningShoe",
      shoeModel: "Air Max",
      terrain: "trail",
      activityLevel: "moderate",
      distance: 5,
      wearLevel: expect.any(String),
      comfortScore: expect.any(String),
      timestamp: expect.any(Date),
    });

    expect(log.timestamp instanceof Date).toBe(true);
  });

  test("getRunStats should compute total disrance and per-shoe stats", () => {
    tracker.logRun(athlete, shoe, 5, "trail");
    tracker.logRun(athlete, shoe, 10, "trail");
    const stats = tracker.getRunStats();
    expect(stats.totalDistance).toBe(15);
    expect(stats.runsByShoe["Air Max"]).toMatchObject({
      totalDistance: 15,
      runs: 2,
      wearLevel: expect.any(Number),
    });
  });
});

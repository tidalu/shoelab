const RecommendationEngine = require("../classes/RecommendationEngine");
const AthleteProfile = require("../classes/AthleteProfile");
const RunningShoe = require("../classes/RunningShoe");
const HikingBoot = require("../classes/HikingBoot");

describe("RecommendationEngine", () => {
  let athlete, runningShoe, hikingBoot;

  beforeEach(() => {
    athlete = new AthleteProfile(
      "Ulugbek",
      44,
      "trail",
      "moderate",
      "RunningShoe"
    );
    runningShoe = new RunningShoe("Nike", "Air Max", 44, "Mesh", 150, "High");
    hikingBoot = new HikingBoot(
      "Salomon",
      "X Ultra",
      44,
      "Gore-Tex",
      200,
      true
    );
  });

  test("Should recommend shoes with higher scores for matching size", () => {
    const wrongSizeShoe = new RunningShoe(
      "Adidas",
      "Ultra Boost",
      38,
      "Mesh",
      150,
      "Medium"
    );
    const recommendations = RecommendationEngine.recommend(athlete, [
      runningShoe,
      wrongSizeShoe,
    ]);

    expect(recommendations[0].shoe.modelName).toBe("Air Max");
    expect(recommendations[0].score).toBeGreaterThan(recommendations[1].score);
  });

  test("Should prioriitize RunningShoe for trail terrain", () => {
    const recommendations = RecommendationEngine.recommend(athlete, [
      runningShoe,
      hikingBoot,
    ]);
    console.log(recommendations, "recommendations");
    expect(recommendations[0].shoe.type).toBe("RunningShoe");
    expect(recommendations[0].score).toBeGreaterThan(recommendations[1].score);
  });

  test("Should prioritize HikingBoot for rocky terrain", () => {
    const athlete = new AthleteProfile(
      "myRoommatesName)",
      42,
      "rocky",
      "moderate",
      "HikingBoot"
    );

    const recommendations = RecommendationEngine.recommend(athlete, [
      runningShoe,
      hikingBoot,
    ]);

    expect(recommendations[0].shoe.type).toBe("HikingBoot");
    expect(recommendations[0].score).toBeGreaterThan(recommendations[1].score);
  });

  test("Should apply wear penalty to shoes", () => {
    runningShoe.wearLevel = 50;
    hikingBoot.wearLevel = 10;
    const recommendations = RecommendationEngine.recommend(athlete, [
      runningShoe,
      hikingBoot,
    ]);

    expect(recommendations[0].shoe.modelName).toBe("X Ultra");
  });

  test("Shoul,d handle empty shoe list", () => {
    const recommendations = RecommendationEngine.recommend(athlete, []);
    expect(recommendations).toEqual([]);
  });
});

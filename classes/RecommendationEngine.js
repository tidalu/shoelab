class RecommendationEngine {
  static recommend(athlete, shoes) {
    const recommendations = shoes.map((shoe) => {
      let score = 0;

      // size match
      const sizeDiff = Math.abs(shoe.size - athlete.footSize);
      score += Math.max(0, 30 - sizeDiff * 10);

      // terain match

      if (
        athlete.preferredTerrain === "trail" &&
        shoe.constructor.name === "RunningShoe"
      ) {
        score += 30;
      } else if (
        ["rocky", "mud"].includes(athlete.preferredTerrain) &&
        shoe.constructor.name === "HikingBoot"
      ) {
        score += 30;
      }

      //activity level
      if (athlete.activityLevel === "intense" && shoe.baseDurability >= 150) {
        score += 15;
      }

      // comfort score
      const comfort = shoe.getComfortScore?.();
      if (typeof comfort === "number") {
        score += Math.floor(comfort / 5);
      }

      // wear penalty
      const wear = parseFloat(shoe.wearLevel);
      const wearPenalty = isNaN(wear) ? 0 : Math.floor(wear);
      score -= wearPenalty;

      return {
        shoe: shoe.getDetailedInfo(),
        score: score,
      };
    });

    return recommendations.sort((a, b) => b.score - a.score);
  }
}

module.exports = RecommendationEngine;

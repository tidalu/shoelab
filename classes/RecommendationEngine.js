class RecommendationEngine {
    static recommend(athlete, shoes) {
        // console.log(athlete, 'this is athlete in recommendation engine')
        const recommendations = shoes.map(shoe =>{
            let score = 0;


            // size match
            const sizeDiff = Math.abs(shoe.size - athlete.footSize);
            console.log('size diff', sizeDiff)
            score += Math.max(0, 30 - sizeDiff * 10);
            // console.log('scoore in size match', score)

            // terain match

            if(athlete.preferredTerrain === 'trail' && shoe.constructor.name === 'RunningShoe') {
                score += 20;
            } else if (['rocky', 'mud'].includes(athlete.preferredTerrain) && shoe.constructor.name === 'HikingBoot') {
                score += 20;
            }

            //activity level
            if( athlete.activityLevel === 'intense' && shoe.baseDurability >= 150) {
                score += 15;
                // console.log('score in loop', score)
            }

            // comfort score
            const comfort = shoe.getComfortScore?.();
            if (typeof comfort === 'number') {
                score += Math.floor(comfort / 5);
            }

            // wear penalty 
            const wearPenalty = Math.min(30, Math.floor(shoe.wearLevel * 0.5))
            score -= wearPenalty;

            return {
                shoe: shoe.getDetailedInfo(),
                score : score,
            }
        })

        return recommendations.sort((a, b) => b.score - a.score)
    }
}

module.exports = RecommendationEngine;
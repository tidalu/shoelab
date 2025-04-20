class RecommendationEngine {
    static recommend(athlete, shoes) {
        const recommendations = shoes.map(shoe =>{
            let score = 0;


            // size match
            const sizeDiff = Math.abs(shoe.size - athlete.footsize);
            score += Math.max(0, 30 - sizeDiff * 10);


            // terain match

            if(athlete.preferredTerrain === 'trail' && shoe.constuctor.name === 'RunningShoe') {
                score += 20;
            } else if (['rock', 'mud'].includes(athlete.preferredTerrain) && shoe.constuctor.name === 'HikingBoot') {
                score += 20;
            }

            //activity level
            if( athlete.activity === 'intense' && shoe.baseDurability >= 150) {
                score += 15;
            }


            // comfort 
            const wearPenalty = Math.floor(shoe.wearLevel)
            score -= wearPenalty;

            return {
                shoe: shoe.getDetailedInfo(),
                score
            }
        })

        return recommendations.sort((a, b) => b.score - a.score)
    }
}

module.exports = RecommendationEngine;
const ShoeFactory = require('./classes/ShoeFactory');
const AthleteProfile = require('./classes/AthleteProfile');
const PerformanceTracker = require('./classes/PerformanceTracker');
const RecommendationEngine = require('./classes/RecommendationEngine');

const athlete = new AthleteProfile('Maya', 40, 'rocky', 'intense', 'HikingBoot');
const shoe = ShoeFactory.generateMany('HikingBoot', 5).concat(
    ShoeFactory.generateMany('RunningShoe', 5)
)


// performance tracking test
const tracker = new PerformanceTracker();
for(i = 0; i < shoe.length; i++) {
    tracker.simulateAndTrack(athlete, shoe[i], 15);
}


tracker.printLogs(); 




// recommendation engine test
const ranked = RecommendationEngine.recommend(athlete, shoe);


// best match for the user
console.log('Best match for the user: ', ranked[0]);

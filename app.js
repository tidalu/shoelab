const ShoeFactory = require('./classes/ShoeFactory');
const AthleteProfile = require('./classes/AthleteProfile');
const PerformanceTracker = require('./classes/PerformanceTracker');

const athlete = new AthleteProfile('Maya', 40, 'rocky', 'intense', 'HikingBoot');
const shoe = ShoeFactory.createRandomShoe('HikingBoot');

const tracker = new PerformanceTracker();
tracker.simulateAndTrack(athlete, shoe, 15);

tracker.printLogs(); 
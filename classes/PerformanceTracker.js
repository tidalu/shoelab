class PerformanceTracker {
    constructor() {
        this.logs= [];
    }


    logStep(athlete, shoe, stepNumber) {
        this.logs.push({
            athleteName : athlete.name,
            shoeType : shoe.constructor.name,
            shoeModel : shoe.modelName,
            terrain : athlete.preferredTerrain,
            activityLevel : athlete.activityLevel,
            stepNumber, 
            wearLevel : shoe.wearLevel.toFixed(2),
            comfortScore : shoe.getComfortScore().toFixed(2),
    })
    }


    simulateAndTrack(athlete, shoe, steps = 10) {
        console.log('log shoes in simulate and track ', shoe)
        for(let i = 0; i < steps; i ++) {
            athlete.simulateActivity(shoe, 1);
            this.logStep(athlete, shoe, i + 1);
        }
    }

    getLogs() {
        return this.logs
    }

    printLogs() {
        console.table(this.logs, [
            'athleteName',
            'shoeType',
            'shoeModel',
            'terrain',
            'activityLevel',
            'stepNumber',
            'wearLevel',
            'comfortScore'
        ])
    }
}

module.exports = PerformanceTracker;
class PerformanceTracker {
    constructor() {
        this.logs= [];
    }

    static calculateWearLevel(totalDistance, durabilityLeft) {
        return (totalDistance / durabilityLeft) * 100;
    }

    static trackRun(shoeData, selectedShoe, distanceRan) {
        if (!shoeData[selectedShoe.modelName]) {
            shoeData[selectedShoe.modelName] = {
                totalDistance: 0,
                durabilityLeft: selectedShoe.durabilityLeft,
                wearLevel: 0,
            };
        }
        shoeData[selectedShoe.modelName].totalDistance += distanceRan;
        shoeData[selectedShoe.modelName].durabilityLeft -= distanceRan;

        const wearLevel = PerformanceTracker.calculateWearLevel(
            shoeData[selectedShoe.modelName].totalDistance,
            selectedShoe.durabilityLeft
        );
        shoeData[selectedShoe.modelName].wearLevel = wearLevel.toFixed(2);
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
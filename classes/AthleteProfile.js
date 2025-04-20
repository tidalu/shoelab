class AthleteProfile {
    constructor(name, footSize, preferredTerrain, activityLevel, preferredShoeType) { 
        this.name = name;
        this.footSize = footSize;
        this.preferredTerrain = preferredTerrain;
        this.activityLevel = activityLevel;
        this.preferredShoeType = preferredShoeType;
    }

    getStepIntensity() {
        switch (this.activityLevel) {
            case 'intense':
                return 3;
            case 'moderate':
                return 2;
            case "casual": 
                default:
                    return 1;
        }
    }

    simulateActivity(shoe, steps = 1) {
        const env = {
            terrain: this.preferredTerrain, 
            intensity: this.getStepIntensity()
        }


        for ( let i = 0; i < steps; i++) {
            shoe.simulateStep(env);
        }

         return {
            name: this.name, 
            shoe: shoe.getDetailedInfo(),
            totalSteps: steps,
         }
    }

    getProfileInfo() {
        return {
            name: this.name,
            footSize: this.footSize, 
            preferredTerrain: this.preferredTerrain,
            activityLevel: this.activityLevel,
            preferredShoeType: this.preferredShoeType,
        }
    }
}

module.exports = AthleteProfile;
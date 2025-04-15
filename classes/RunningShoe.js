const Shoe = require("./Shoe.js");


class RunningShoe extends Shoe {
    constructor(brand, modelName, size, material, baseDurability, cushioningLevel) {
        super(brand, modelName, size, material, baseDurability);
        this.cushioningLevel = cushioningLevel;
    }


    simulateStep({terrain = "track", intensity = 1}) {
        let wearMultiplier ;


        switch (terrain ) {
            case "road": 
                wearMultiplier = 1.2;
                break;
            case "trail":
                wearMultiplier = 1.5;
                break;
            case "track":
                wearMultiplier = 1.0;
                break;
            default:
                wearMultiplier = 1.0;
                break;
        }
        
        const cushionFactor = {
            low: 1.1,
            medium: 1.0,
            high: 0.9
        }[this.cushioningLevel] || 1.0;

        const wearAdded = intensity * wearMultiplier * cushionFactor * 2;
        this.wearLevel += wearAdded;    
    }

    getComfortScore() {
        const wearImpact = this.wearLevel * 0.5
        const cushionBonus ={
            Low: 5, 
            Medium: 10,
            High: 15
        }[this.cushioningLevel] || 10;

        return Math.max(0, 100 - wearImpact + cushionBonus);
    }

    getDetailedInfo() {
        return {
            ...this.getBasicInfo(),
            type: "RunningShoe",
            cushioningLevel: this.cushioningLevel,
            comfortScore: this.getComfortScore(),
        };
    }
}

module.exports = RunningShoe;



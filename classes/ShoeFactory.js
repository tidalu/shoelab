const RunningShoe = require('./RunningShoe');
const HikingBoot = require('./HikingBoot');


class ShoeFactory {
    static createRandomShoe(type = 'RunningShoe'){
        const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'];
        const models = ['Air Max', 'Ultra Boost', 'Clyde', 'Classic', 'Fresh Foam'];
        const materials = ['Mesh', 'Leather', 'Synthetic', 'Canvas'];
        const sizes = [38, 39, 40, 41, 42, 43, 44, 45];
        const durability = [100, 120, 150, 180];

        const brand = ShoeFactory._pick(brands);
        const model = ShoeFactory._pick(models);
        const size = ShoeFactory._pick(sizes);
        const material = ShoeFactory._pick(materials);
        const baseDurability = ShoeFactory._pick(durability);

        if(type === "HikingBoot") {
            const ankleSupport = Math.random() < 0.8; 
            return new HikingBoot(brand, model, size, material, baseDurability, ankleSupport);

        } else {
            const cushiooningOptions = ['Low', 'Medium', 'High'];
            const cushioning = ShoeFactory._pick(cushiooningOptions);
            return new RunningShoe(brand, model, size, material, baseDurability, cushioning);
        }
    }

    static _pick(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static generateMany(type, count = 10) {
        return Array.from({length: count}, () => ShoeFactory.createRandomShoe(type));
    }
    
}

module.exports = ShoeFactory;

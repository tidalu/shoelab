const RunningShoe = require('./RunningShoe');
const HikingBoot = require('./HikingBoot');


class ShoeFactory {
    static createRandomShoe(type = 'RunningShoe'){
        const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Asics', 'Saucony', 'Brooks', 'Mizuno', 'Hoka One One', 'On', 'Salomon', 'Merrell', 'Columbia', 'North Face', 'Timberland', 'Keen', 'Scarpa', 'La Sportiva', 'Lowa', 'Salewa', 'Vasque', 'Oboz', 'Altra', 'Under Armour', 'Fila', 'Diadora', 'K-Swiss', 'Vans', 'Converse', 'Skechers', 'Ecco', 'Clarks', 'Dr. Martens', 'Timberland', 'UGG'];
        const models = ['Air Max', 'Ultra Boost', 'Clyde', 'Classic', 'Fresh Foam', 'Gel-Kayano', 'Wave Rider', 'Hurricane', 'Terrex', 'Speedcross', 'Vapor', 'Hoka One One', 'Asics', 'Brooks', 'Saucony', 'Mizuno', 'On', 'Salomon', 'Merrell', 'Columbia', 'North Face', 'Timberland', 'Keen', 'Scarpa', 'La Sportiva', 'Lowa', 'Salewa', 'Vasque', 'Oboz', 'Altra'];
        const materials = ['Mesh', 'Leather', 'Synthetic', 'Canvas', 'Suede', 'Gore-Tex', 'Rubber', 'Neoprene', 'Nylon', 'Polyester', 'Cotton', 'EVA', 'Phylon', 'PU', 'TPU', 'Vibram', 'Ortholite', '3M Thinsulate', 'Coolmax', 'Dri-FIT', 'Climacool', 'Gore-Tex Surround', 'Primaloft'];
        const sizes = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
        const durability = [100, 120, 150, 180];

        const brand = ShoeFactory._pick(brands);
        const model = ShoeFactory._pick(models);
        const size = ShoeFactory._pick(sizes);
        const material = ShoeFactory._pick(materials);
        const baseDurability = ShoeFactory._pick(durability) || 100; 

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

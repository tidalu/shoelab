const reviveShoes = require('../utils/reviveShoes');
const RunningShoe = require('../classes/RunningShoe');
const HikingBoot = require('../classes/HikingBoot');


describe('reviveShoes', ()=>{
    test('should revive a single RunningSHe', ()=> {
        const shoeData = {
            type: 'RunningShoe',
            brand: 'Nike',
            modelName: 'Air Max',
            size: 42,
            material: 'Mesh',
            durabilityLeft: 100,
            cushioningLevel: 'High',
            wearLevel: '10.00'
        }
        const revievedShoe = reviveShoes(shoeData);
        expect(revievedShoe).toBeInstanceOf(RunningShoe);
        expect(revievedShoe.brand).toBe('Nike');
        expect(revievedShoe.modelName).toBe('Air Max');
        expect(revievedShoe.size).toBe(42);
        expect(revievedShoe.material).toBe('Mesh');
        expect(revievedShoe.durabilityLeft).toBe(100);
        expect(revievedShoe.cushioningLevel).toBe('High');
        expect(revievedShoe.wearLevel).toBe('10.00');
    })

    test('should revive a single HikingBoot', ()=> {const shoeData = {
        type: 'HikingBoot',
        brand: 'Salomon',
        modelName: 'Quest',
        size: 42,
        material: 'Gore-Tex',
        durabilityLeft: 150,
        ankleSupport: true,
        wearLevel: '5.00'
      };
      const revived = reviveShoes(shoeData);
      expect(revived).toBeInstanceOf(HikingBoot);
      expect(revived.brand).toBe('Salomon');
      expect(revived.modelName).toBe('Quest');
      expect(revived.size).toBe(42);
      expect(revived.material).toBe('Gore-Tex');
      expect(revived.durabilityLeft).toBe(150);
      expect(revived.ankleSupport).toBe(true);
      expect(revived.wearLevel).toBe('5.00');
    })


    test('should revive an array of shoes', () =>{
        const shoeArray = [
            { type: 'RunningShoe', brand: 'Nike', modelName: 'Air Max', size: 42, material: 'Mesh', durabilityLeft: 100, cushioningLevel: 'High', wearLevel: '10.00' },
      { type: 'HikingBoot', brand: 'Salomon', modelName: 'Quest', size: 42, material: 'Gore-Tex', durabilityLeft: 150, ankleSupport: true, wearLevel: '5.00' }
        ]
        const revievedShoes = reviveShoes(shoeArray);
        expect(revievedShoes).toHaveLength(2);  
        expect(revievedShoes[0]).toBeInstanceOf(RunningShoe);
        expect(revievedShoes[1]).toBeInstanceOf(HikingBoot);
        expect(revievedShoes[0].brand).toBe('Nike');
        expect(revievedShoes[1].brand).toBe('Salomon');
    })

    test('shouuld return null for unknown shoe typ', () =>{
        const shoeData = {
            type: 'UnknownShoe',
            brand: 'Nike',
            modelName: 'Air Max',
            size: 42,
            material: 'Mesh',
            durabilityLeft: 100,
            cushioningLevel: 'High',
            wearLevel: '10.00'
        }
        console.warn = jest.fn();
        const revivedShoe = reviveShoes(shoeData);
        expect(revivedShoe).toBeNull();
        expect(console.warn).toHaveBeenCalledWith(
            'Unknown shoe type: UnknownShoe, I dont revive buddy!'
        )

    })
})
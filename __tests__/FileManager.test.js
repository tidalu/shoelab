const fs = require('fs');
const path = require('path');
const { saveJSON, loadJSON } = require('../utils/FileManager');


jest.mock('fs');

describe('FileManager', () =>{
    beforeEach(() =>{
        fs.writeFileSync.mockClear();
        fs.readFileSync.mockClear();
        fs.existsSync.mockClear();
    });

    test('saveJSON should save data to a file', () => {
        const filename = 'test.json';
        const data = { name: 'test' };
        saveJSON(filename, data);
        expect(fs.writeFileSync).toHaveBeenCalledWith(
            expect.stringContaining(filename),
            JSON.stringify(data, null, 2),
            'utf-8'
        );
    });

    test('loadJSON should load data from a file', () => {
        const filename = 'test.json';
        const data = { name: 'test' };
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(data));
        
        const result = loadJSON(filename);
        expect(result).toEqual(data);
        expect(fs.readFileSync).toHaveBeenCalledWith(expect.stringContaining(filename), 'utf-8');
    });

    test('loadJSON should return null if file does not exist', () => {
        const filename = 'nonexistent.json';
        fs.existsSync.mockReturnValue(false);
        
        const result = loadJSON(filename);
        expect(result).toBeNull();
        expect(fs.readFileSync).not.toHaveBeenCalled();
    });

})
const validTerrains = ['trail', 'rocky', 'mud']
const validActivityLevels = ['light', 'moderate', 'intense'];
const minFootSize = 30;
const maxFootSize = 50;
const minDistance = 0.1;


function validateFootSize(footSize) {
    const parsed = parseFloat(footSize);
    if(isNaN(footSize) || parsed < minFootSize || parsed > maxFootSize) {
        throw new Error(`Invalid foot size. Must be a number between ${minFootSize} and ${maxFootSize}.`);
    }
    return parsed;
}
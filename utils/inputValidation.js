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

function validateTerrain(terrain) {
    const normalized = terrain.toLowerCase();
    if (!validTerrains.includes(normalized)) {
        throw new Error(`Invalid terrain. Must be one of: ${validTerrains.join(', ')}`);
    }
}


function validateActivityLevel(level) {
    const normalized = level.toLowerCase();
    if (!validActivityLevels.includes(normalized)) {
      throw new Error(`Activity level must be one of: ${validActivityLevels.join(", ")}`);
    }
    return normalized;
  }

  function validateDistance(distance) {
    const parsed = parseFloat(distance);
    if (isNaN(parsed) || parsed < minDistance) {
      throw new Error(`Distance must be a number greater than or equal to ${minDistance} km.`);
    }
    return parsed;
  }

  function validateSelection(index, max) {
    const parsed = parseInt(index);
    if (isNaN(parsed) || parsed < 1 || parsed > max) {
      throw new Error(`Selection must be a number between 1 and ${max}.`);
    }
    return parsed;
  }

  module.exports = {
    validateFootSize,
    validateTerrain,
    validateActivityLevel,
    validateDistance,
    validateSelection
  };
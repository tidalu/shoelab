const { RunningShoe, HikingBoot } = require("../classes/ShoeTypes");

// const shoeData = {
//   type: "RunningShoe",
//   brand: "Nike",
//   modelName: "Air Max",
//   size: 42,
//   material: "Mesh",
//   durabilityLeft: 100,
//   cushioningLevel: "High",
//   wearLevel: "10.0",
// };  smple shoe data

function reviveShoe(shoe) {
  let revived;
  switch (shoe.type) {
    case "RunningShoe":
      revived = new RunningShoe();
      break;
    case "HikingBoot":
      revived = new HikingBoot();
      break;
    default:
      console.warn(`Unknown shoe type`);
      return null;
  }
  Object.assign(revived, shoe);
  revived.wearLevel = parseFloat(shoe.wearLevel);
  return revived;
}

function reviveShoes(shoeArray) {
  if (!Array.isArray(shoeArray)) {
    return reviveShoe(shoeArray);
  }
  return shoeArray.map(reviveShoe);
}

module.exports = reviveShoes;

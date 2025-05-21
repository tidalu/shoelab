const { RunningShoe, HikingBoot } = require("../classes/ShoeTypes");

function reviveShoe(shoe) {
  let revived;
  if (shoe instanceof RunningShoe || shoe instanceof HikingBoot) {
    return shoe;
  }
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
  console.log("wearlevel in shoe rweviever, and revived shoe ---> ", revived, revived.wearLevel);
  return revived;
}

function reviveShoes(shoeArray) {
  if (!Array.isArray(shoeArray)) {
    return reviveShoe(shoeArray);
  }
  return shoeArray.map(reviveShoe);
}

module.exports = reviveShoes;

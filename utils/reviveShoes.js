const { RunningShoe, HikingBoot } = require("../classes/ShoeTypes");

function reviveShoe(shoe) {
  switch (shoe.type) {
    case "RunningShoe":
      return Object.assign(new RunningShoe(), shoe);
    case "HikingBoot":
      return Object.assign(new HikingBoot(), shoe);
    default:
      console.warn(`Unknown shoe type: ${shoe.type}`);
      return null;
  }
}

function reviveShoes(shoeArray) {
  if (!Array.isArray(shoeArray)) {
    return reviveShoe(shoeArray)
  }
  return shoeArray.map(reviveShoe);
}

module.exports = reviveShoes;

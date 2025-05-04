const {
  validateFootSize,
  validateTerrain,
  validateActivityLevel,
  validateDistance,
  validateSelection,
} = require("../utils/inputValidation.js");

describe(" input validation", () => {
  test("validateFootSize should accept valid foot sizes", () => {
    expect(validateFootSize(42)).toBe(42);
    expect(validateFootSize(30)).toBe(30);
    expect(validateFootSize(50)).toBe(50);
  });

  test("validateFootSize should not accept invalid foor sizes", () => {
    expect(() => validateFootSize(29)).toThrow(
      /Invalid foot size. Must be a number between 30 and 50./
    );
    expect(() => validateFootSize(51)).toThrow(
      /Invalid foot size. Must be a number between 30 and 50./
    );
    expect(() => validateFootSize("oops")).toThrow(
      /Invalid foot size. Must be a number between 30 and 50./
    );
  });

  test("validateTerrain should accept valid terrains", () => {
    expect(validateTerrain("trail")).toBeUndefined();
    expect(validateTerrain("rocky")).toBeUndefined();
    expect(validateTerrain("mud")).toBeUndefined();
  });

  test("validateTerrain should not accept invalid terrains", () => {
    expect(() => validateTerrain("mars")).toThrow(
      /Invalid terrain. Must be one of: trail, rocky, mud/
    );
    expect(() => validateTerrain("clouds:)")).toThrow(
      /Invalid terrain. Must be one of: trail, rocky, mud/
    );
  });

  test("validateActivityLevel should accept valid activity ;evels", () => {
    expect(validateActivityLevel("light")).toBe("light");
    expect(validateActivityLevel("moderate")).toBe("moderate");
    expect(validateActivityLevel("intense")).toBe("intense");
  });

  test("validateActivityLevel should not accept invalid activity levels", () => {
    expect(() => validateActivityLevel("super-duper")).toThrow(
      /Activity level must be one of: light, moderate, intense/
    );
  });

  test("validateDistance should accept valid distances", () => {
    expect(validateDistance(0.1)).toBe(0.1);
    expect(validateDistance(10)).toBe(10);
  });

  test("validateDistance should reject invalid distances", () => {
    expect(() => validateDistance("0")).toThrow(
      /Distance must be a number greater than or equal to 0.1/
    );
    expect(() => validateDistance("-1")).toThrow(
      /Distance must be a number greater than or equal to 0.1/
    );
    expect(() => validateDistance("a meter")).toThrow(
      /Distance must be a number greater than or equal to 0.1/
    );
  });

  test("validateSelection should accept valid selections", () => {
    expect(validateSelection(1, 5)).toBe(1);
    expect(validateSelection(3, 10)).toBe(3);
    expect(validateSelection(5, 5)).toBe(5);
  });
  test("validateSelection should reject invalid selections", () => {
    expect(() => validateSelection(0, 5)).toThrow(
      /Selection must be a number between 1 and 5/
    );
    expect(() => validateSelection(6, 5)).toThrow(
      /Selection must be a number between 1 and 5/
    );
    expect(() => validateSelection("oops", 5)).toThrow(
      /Selection must be a number between 1 and 5/
    );
  });
});

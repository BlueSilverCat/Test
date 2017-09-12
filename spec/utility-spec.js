"use babel";

import {
  getOnlySecond,
} from "../lib/utility";

describe("utility", () => {
  it("test getOnlySecond 1st", () => {
    let first = [1, 3];
    let second = [1, 2, 3, 4];

    let result = getOnlySecond(first, second);
    expect(result).toEqual([2, 4]);
  });

  it("test getOnlySecond 2nd", () => {
    let first = [1, 3];
    let second = [1, 3];

    let result = getOnlySecond(first, second);
    expect(result).toEqual([]);
  });

  it("test getOnlySecond 3rd", () => {
    let first = [];
    let second = [1, 3];

    let result = getOnlySecond(first, second);
    expect(result).toEqual([1, 3]);
  });
});

"use babel";

import {
  getOnlySecond,
  binarySearch,
} from "../lib/utility";

describe("utility", () => {
  describe("getOnlySecond", () => {
    let first = [];
    let second = [];
    let result = [];

    it("test 1st", () => {
      first = [1, 3];
      second = [1, 2, 3, 4];

      result = getOnlySecond(first, second);
      expect(result).toEqual([2, 4]);
    });

    it("test 2nd", () => {
      first = [1, 3];
      second = [1, 3];

      result = getOnlySecond(first, second);
      expect(result).toEqual([]);
    });

    it("test 3rd", () => {
      first = [];
      second = [1, 3];

      result = getOnlySecond(first, second);
      expect(result).toEqual([1, 3]);
    });
  });

  describe("binarySearch", () => {
    function testCompare(x, y) {
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    }

    let array = [];
    let result = null;

    it("test 1st", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 6, testCompare);
      expect(result).toEqual(5);
    });

    it("test 2nd", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 11, testCompare);
      expect(result).toEqual(-1);
    });

    it("test 3rd", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 0, testCompare);
      expect(result).toEqual(-1);
    });

    it("test 4th", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 1, testCompare);
      expect(result).toEqual(0);
    });

    it("test 5th", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 10, testCompare);
      expect(result).toEqual(9);
    });
  });
});

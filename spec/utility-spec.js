"use babel";

import {
  isEmpty,
  isEmptyString,
  isEmptyObject,
  isEqualObj,
  checkInteger,

  getOnlySecond,
  binarySearch,
  shallowCopy,
  deepCopy,

  stringToNumber,
  stringToBoolean,
} from "../lib/utility";

describe("utility", () => {
  describe("isEmpty", () => {
    let obj = null;

    it("test 1", () => {
      obj = null;
      expect(isEmpty(obj)).toBe(true);
    });
    it("test 2", () => {
      obj = undefined;
      expect(isEmpty(obj)).toBe(true);
    });
    it("test 3", () => {
      obj = {};
      expect(isEmpty(obj)).toBe(false);
    });
    it("test 4", () => {
      obj = "";
      expect(isEmpty(obj)).toBe(false);
    });
    it("test 5", () => {
      obj = 0;
      expect(isEmpty(obj)).toBe(false);
    });
    it("test 6", () => {
      obj = false;
      expect(isEmpty(obj)).toBe(false);
    });
  });

  describe("isEmptyString", () => {
    let obj = null;

    it("test 1", () => {
      obj = "";
      expect(isEmptyString(obj)).toBe(true);
    });
    it("test 2", () => {
      obj = "123";
      expect(isEmptyString(obj)).toBe(false);
    });
    it("test 3", () => {
      obj = 123;
      expect(isEmptyString(obj)).toBe(false);
    });
  });

  describe("isEmptyObject", () => {
    let obj = null;

    it("test 1", () => {
      obj = {};
      expect(isEmptyObject(obj)).toBe(true);
    });
    it("test 2", () => {
      obj = { "a": 1 };
      expect(isEmptyObject(obj)).toBe(false);
    });
    it("test 3", () => {
      obj = "";
      expect(isEmptyObject(obj)).toBe(false);
    });
    it("test 4", () => {
      obj = [];
      expect(isEmptyObject(obj)).toBe(false);
    });
  });

  describe("isEqualObj", () => {
    let obj1 = {};
    let obj2 = {};

    it("test 1", () => {
      obj1 = { "a": 1, "b": 2 };
      obj2 = { "a": 1, "b": 2 };

      expect(obj1).not.toBe(obj2);
      expect(obj1).toEqual(obj2);
      expect(isEqualObj(obj1, obj2)).toBe(true);
    });

    it("test 2", () => {
      obj1 = { "a": 1, "b": 2 };
      obj2 = { "a": 2, "b": 4 };

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(isEqualObj(obj1, obj2)).toBe(false);
    });

    it("test 3", () => {
      obj1 = { "a": 1, "b": 2 };
      obj2 = { "a": 1, "d": 2 };

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(isEqualObj(obj1, obj2)).toBe(false);
    });

    it("test 4", () => {
      obj1 = [1, 2, 3];
      obj2 = [1, 2, 3];

      expect(obj1).not.toBe(obj2);
      expect(obj1).toEqual(obj2);
      expect(isEqualObj(obj1, obj2)).toBe(true);
    });

    it("test 5", () => {
      obj1 = [1, 2, 3];
      obj2 = [1, 4, 5];

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(isEqualObj(obj1, obj2)).toBe(false);
    });

    it("test 6", () => {
      obj1 = [1, 2, 3];
      obj2 = [1, 2, 3, 4];

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(isEqualObj(obj1, obj2)).toBe(false);
    });

    it("test 7", () => {
      obj1 = [1, 2, { "a": 1, "b": [2, 1] }, 4];
      obj2 = [1, 2, { "a": 1, "b": [2, 1] }, 4];

      expect(obj1).not.toBe(obj2);
      expect(obj1).toEqual(obj2);
      expect(isEqualObj(obj1, obj2)).toBe(true);
    });

    it("test 8", () => {
      obj1 = [1, 2, { "a": 1, "b": [2, 1] }, 4];
      obj2 = [1, 2, { "a": 3, "b": [2, 1] }, 4];

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(isEqualObj(obj1, obj2)).toBe(false);
    });
  });

  describe("checkInteger", () => {
    let num = 0;
    let min = 0;
    let max = 0;

    it("test 1", () => {
      num = 0;
      min = 0;
      max = 10;
      expect(checkInteger(num, min, max)).toBe(true);
    });

    it("test 2", () => {
      num = 10;
      min = 0;
      max = 10;
      expect(checkInteger(num, min, max)).toBe(true);
    });

    it("test 3", () => {
      num = 5;
      min = 0;
      max = 10;
      expect(checkInteger(num, min, max)).toBe(true);
    });

    it("test 4", () => {
      num = -1;
      min = 0;
      max = 10;
      expect(checkInteger(num, min, max)).toBe(false);
    });

    it("test 5", () => {
      num = 11;
      min = 0;
      max = 10;
      expect(checkInteger(num, min, max)).toBe(false);
    });

    it("test 6", () => {
      num = 8;
      min = null;
      max = null;
      expect(checkInteger(num, min, max)).toBe(true);
    });

    it("test 7", () => {
      num = NaN;
      min = null;
      max = null;
      expect(checkInteger(num, min, max)).toBe(false);
    });

    it("test 8", () => {
      num = 2.0; //整数と判定される
      min = null;
      max = null;
      expect(checkInteger(num, min, max)).toBe(true);
    });

    it("test 9", () => {
      num = -10;
      min = null;
      max = null;
      expect(checkInteger(num, min, max)).toBe(true);
    });

    it("test 10", () => {
      num = -5;
      min = -10;
      max = -1;
      expect(checkInteger(num, min, max)).toBe(true);
    });

    it("test 11", () => {
      num = 2.5;
      min = null;
      max = null;
      expect(checkInteger(num, min, max)).toBe(false);
    });
  });

  describe("getOnlySecond", () => {
    let first = [];
    let second = [];
    let result = [];

    it("test 1", () => {
      first = [1, 3];
      second = [1, 2, 3, 4];

      result = getOnlySecond(first, second);
      expect(result).toEqual([2, 4]);
    });

    it("test 2", () => {
      first = [1, 3];
      second = [1, 3];

      result = getOnlySecond(first, second);
      expect(result).toEqual([]);
    });

    it("test 3", () => {
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

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 6, testCompare);
      expect(result).toEqual(5);
    });

    it("test 2", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 11, testCompare);
      expect(result).toEqual(-1);
    });

    it("test 3", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 0, testCompare);
      expect(result).toEqual(-1);
    });

    it("test 4", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 1, testCompare);
      expect(result).toEqual(0);
    });

    it("test 5", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = binarySearch(array, 10, testCompare);
      expect(result).toEqual(9);
    });
  });

  describe("shallowCopy", () => {
    let oldObj = {};
    let newObj = {};

    beforeEach(() => {
      newObj = {};
    });

    it("test 1", () => {
      oldObj = { "a": 1, "b": 2 };
      newObj = shallowCopy(oldObj);

      expect(Object.is(newObj, oldObj)).toEqual(false);

      expect(newObj).not.toBe(oldObj);
      expect(newObj).toEqual(oldObj);

      oldObj.a = 2;
      expect(newObj).not.toEqual(oldObj);
      expect(oldObj).toEqual({ "a": 2, "b": 2 });
      expect(newObj).toEqual({ "a": 1, "b": 2 });
      //console.log(newObj, oldObj, newObj === oldObj);
    });

    it("test 2", () => {
      oldObj = [1, 2, 3];
      newObj = shallowCopy(oldObj);

      expect(newObj).not.toBe(oldObj);
      expect(newObj).toEqual(oldObj);

      oldObj.push(4);
      expect(newObj).not.toEqual(oldObj);
      expect(oldObj).toEqual([1, 2, 3, 4]);
      expect(newObj).toEqual([1, 2, 3]);
      //console.log(newObj, oldObj, newObj === oldObj);
    });

    it("test 3", () => {
      oldObj = { "a": 1, "b": 2, "c": [3, 4] };
      newObj = shallowCopy(oldObj);

      expect(newObj).not.toBe(oldObj);
      expect(newObj).toEqual(oldObj);

      oldObj.c[2] = 5;
      expect(newObj).toEqual(oldObj);
      expect(newObj.c).toEqual(oldObj.c);
      expect(oldObj).toEqual({ "a": 1, "b": 2, "c": [3, 4, 5] });
      expect(newObj).toEqual({ "a": 1, "b": 2, "c": [3, 4, 5] });
      //console.log(newObj, oldObj, newObj === oldObj);
    });

    it("test 4", () => {
      oldObj = [1, 2, { "a": 1, "b": 2 }];
      newObj = shallowCopy(oldObj);

      expect(Object.is(newObj, oldObj)).toEqual(false);

      expect(newObj).not.toBe(oldObj);
      expect(newObj).toEqual(oldObj);

      oldObj[2].c = 3;
      expect(newObj).toEqual(oldObj);
      expect(newObj[2]).toEqual(oldObj[2]);
      expect(oldObj).toEqual([1, 2, { "a": 1, "b": 2, "c": 3 }]);
      expect(newObj).toEqual([1, 2, { "a": 1, "b": 2, "c": 3 }]);
      //console.log(newObj, oldObj, newObj === oldObj);
    });
  });

  describe("deepCopy", () => {
    let oldObj = {};
    let newObj = {};

    beforeEach(() => {
      newObj = {};
    });

    it("test 1", () => {
      oldObj = { "a": 1, "b": 2 };
      newObj = deepCopy(oldObj);

      expect(Object.is(newObj, oldObj)).toEqual(false);

      expect(newObj).not.toBe(oldObj);
      expect(newObj).toEqual(oldObj);

      oldObj.a = 2;
      expect(newObj).not.toEqual(oldObj);
      expect(oldObj).toEqual({ "a": 2, "b": 2 });
      expect(newObj).toEqual({ "a": 1, "b": 2 });
      //console.log(newObj, oldObj, newObj === oldObj);
    });

    it("test 2", () => {
      oldObj = [1, 2, 3];
      newObj = deepCopy(oldObj);

      expect(newObj).not.toBe(oldObj);
      expect(newObj).toEqual(oldObj);

      oldObj.push(4);
      expect(newObj).not.toEqual(oldObj);
      expect(oldObj).toEqual([1, 2, 3, 4]);
      expect(newObj).toEqual([1, 2, 3]);
      //console.log(newObj, oldObj, newObj === oldObj);
    });

    it("test 3", () => {
      oldObj = { "a": 1, "b": 2, "c": [3, 4] };
      newObj = deepCopy(oldObj);

      expect(newObj).not.toBe(oldObj);
      expect(newObj).toEqual(oldObj);

      oldObj.c[2] = 5;
      expect(newObj).not.toEqual(oldObj);
      expect(newObj.c).not.toEqual(oldObj.c);
      expect(oldObj).toEqual({ "a": 1, "b": 2, "c": [3, 4, 5] });
      expect(newObj).toEqual({ "a": 1, "b": 2, "c": [3, 4] });
      //console.log(newObj, oldObj, newObj === oldObj);
    });

    it("test 4", () => {
      oldObj = [1, 2, { "a": 1, "b": 2 }];
      newObj = deepCopy(oldObj);

      expect(Object.is(newObj, oldObj)).toEqual(false);

      expect(newObj).not.toBe(oldObj);
      expect(newObj).toEqual(oldObj);

      oldObj[2].c = 3;
      expect(newObj).not.toEqual(oldObj);
      expect(newObj[2]).not.toEqual(oldObj[2]);
      expect(oldObj).toEqual([1, 2, { "a": 1, "b": 2, "c": 3 }]);
      expect(newObj).toEqual([1, 2, { "a": 1, "b": 2 }]);
      //console.log(newObj, oldObj, newObj === oldObj);
    });
  });

  describe("stringToNumber", () => {
    let string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "12345";
      result = stringToNumber(string);
      expect(result).toBe(12345);
    });

    it("test 2", () => {
      string = "+12345";
      result = stringToNumber(string);
      expect(result).toBe(12345);
    });

    it("test 3", () => {
      string = "-12345";
      result = stringToNumber(string);
      expect(result).toBe(-12345);
    });

    it("test 4", () => {
      string = "";
      result = stringToNumber(string);
      expect(result).toBeNaN();
    });

    it("test 5", () => {
      string = "123.45";
      result = stringToNumber(string);
      expect(result).toBe(123.45);
    });

    it("test 6", () => {
      string = "123.0";
      result = stringToNumber(string);
      expect(result).toBe(123);
      //console.log(result);
    });

    it("test 7", () => {
      string = "123.";
      result = stringToNumber(string);
      expect(result).toBeNaN();
      //console.log(result);
    });

    it("test 8", () => {
      string = "123.45e2";
      result = stringToNumber(string);
      expect(result).toBe(12345);
      //console.log(result);
    });

    it("test 9", () => {
      string = "123.45e+2";
      result = stringToNumber(string);
      expect(result).toBe(12345);
      //console.log(result);
    });

    it("test 10", () => {
      string = "123.45e-2";
      result = stringToNumber(string);
      expect(result).toBe(1.2345);
      //console.log(result);
    });
  });

  describe("stringToBoolean", () => {
    let string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "true";
      result = stringToBoolean(string);
      expect(result).toBe(true);
    });

    it("test 2", () => {
      string = "false";
      result = stringToBoolean(string);
      expect(result).toBe(false);
    });

    it("test 3", () => {
      string = "";
      result = stringToBoolean(string);
      expect(result).toBe(false);
    });

    it("test 4", () => {
      string = "cat";
      result = stringToBoolean(string);
      expect(result).toBe(false);
    });
  });
});

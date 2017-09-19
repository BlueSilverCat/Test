"use babel";

import * as utility from "../lib/utility";

describe("utility", () => {
  describe("isEmpty", () => {
    let obj = null;

    it("test 1", () => {
      obj = null;
      expect(utility.isEmpty(obj)).toBe(true);
    });
    it("test 2", () => {
      obj = undefined;
      expect(utility.isEmpty(obj)).toBe(true);
    });
    it("test 3", () => {
      obj = {};
      expect(utility.isEmpty(obj)).toBe(false);
    });
    it("test 4", () => {
      obj = "";
      expect(utility.isEmpty(obj)).toBe(false);
    });
    it("test 5", () => {
      obj = 0;
      expect(utility.isEmpty(obj)).toBe(false);
    });
    it("test 6", () => {
      obj = false;
      expect(utility.isEmpty(obj)).toBe(false);
    });
  });

  describe("isEmptyString", () => {
    let obj = null;

    it("test 1", () => {
      obj = "";
      expect(utility.isEmptyString(obj)).toBe(true);
    });
    it("test 2", () => {
      obj = "123";
      expect(utility.isEmptyString(obj)).toBe(false);
    });
    it("test 3", () => {
      obj = 123;
      expect(utility.isEmptyString(obj)).toBe(false);
    });
  });

  describe("isEmptyObject", () => {
    let obj = null;

    it("test 1", () => {
      obj = {};
      expect(utility.isEmptyObject(obj)).toBe(true);
    });
    it("test 2", () => {
      obj = { "a": 1 };
      expect(utility.isEmptyObject(obj)).toBe(false);
    });
    it("test 3", () => {
      obj = "";
      expect(utility.isEmptyObject(obj)).toBe(false);
    });
    it("test 4", () => {
      obj = [];
      expect(utility.isEmptyObject(obj)).toBe(false);
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
      expect(utility.isEqualObj(obj1, obj2)).toBe(true);
    });

    it("test 2", () => {
      obj1 = { "a": 1, "b": 2 };
      obj2 = { "a": 2, "b": 4 };

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(utility.isEqualObj(obj1, obj2)).toBe(false);
    });

    it("test 3", () => {
      obj1 = { "a": 1, "b": 2 };
      obj2 = { "a": 1, "d": 2 };

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(utility.isEqualObj(obj1, obj2)).toBe(false);
    });

    it("test 4", () => {
      obj1 = [1, 2, 3];
      obj2 = [1, 2, 3];

      expect(obj1).not.toBe(obj2);
      expect(obj1).toEqual(obj2);
      expect(utility.isEqualObj(obj1, obj2)).toBe(true);
    });

    it("test 5", () => {
      obj1 = [1, 2, 3];
      obj2 = [1, 4, 5];

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(utility.isEqualObj(obj1, obj2)).toBe(false);
    });

    it("test 6", () => {
      obj1 = [1, 2, 3];
      obj2 = [1, 2, 3, 4];

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(utility.isEqualObj(obj1, obj2)).toBe(false);
    });

    it("test 7", () => {
      obj1 = [1, 2, { "a": 1, "b": [2, 1] }, 4];
      obj2 = [1, 2, { "a": 1, "b": [2, 1] }, 4];

      expect(obj1).not.toBe(obj2);
      expect(obj1).toEqual(obj2);
      expect(utility.isEqualObj(obj1, obj2)).toBe(true);
    });

    it("test 8", () => {
      obj1 = [1, 2, { "a": 1, "b": [2, 1] }, 4];
      obj2 = [1, 2, { "a": 3, "b": [2, 1] }, 4];

      expect(obj1).not.toBe(obj2);
      expect(obj1).not.toEqual(obj2);
      expect(utility.isEqualObj(obj1, obj2)).toBe(false);
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
      expect(utility.checkInteger(num, min, max)).toBe(true);
    });

    it("test 2", () => {
      num = 10;
      min = 0;
      max = 10;
      expect(utility.checkInteger(num, min, max)).toBe(true);
    });

    it("test 3", () => {
      num = 5;
      min = 0;
      max = 10;
      expect(utility.checkInteger(num, min, max)).toBe(true);
    });

    it("test 4", () => {
      num = -1;
      min = 0;
      max = 10;
      expect(utility.checkInteger(num, min, max)).toBe(false);
    });

    it("test 5", () => {
      num = 11;
      min = 0;
      max = 10;
      expect(utility.checkInteger(num, min, max)).toBe(false);
    });

    it("test 6", () => {
      num = 8;
      min = null;
      max = null;
      expect(utility.checkInteger(num, min, max)).toBe(true);
    });

    it("test 7", () => {
      num = NaN;
      min = null;
      max = null;
      expect(utility.checkInteger(num, min, max)).toBe(false);
    });

    it("test 8", () => {
      num = 2.0; //整数と判定される
      min = null;
      max = null;
      expect(utility.checkInteger(num, min, max)).toBe(true);
    });

    it("test 9", () => {
      num = -10;
      min = null;
      max = null;
      expect(utility.checkInteger(num, min, max)).toBe(true);
    });

    it("test 10", () => {
      num = -5;
      min = -10;
      max = -1;
      expect(utility.checkInteger(num, min, max)).toBe(true);
    });

    it("test 11", () => {
      num = 2.5;
      min = null;
      max = null;
      expect(utility.checkInteger(num, min, max)).toBe(false);
    });
  });

  describe("isEscapedChar", () => {
    let string = "";
    let index = -1;
    let result = false;

    beforeEach(() => {
      result = false;
    });

    it("test 1", () => {
      string = "0123456789";
      index = 6;
      result = utility.isEscapedChar(string, index);
      expect(result).toBe(false);
    });

    it("test 2", () => {
      string = "012345\\6789";
      index = 7;
      result = utility.isEscapedChar(string, index);
      expect(result).toBe(true);
    });
  });

  describe("isSameSubString", () => {
    let string = "";
    let compString = "";
    let start = 0;
    let result = "";

    beforeEach(() => {
      result = "";
    });

    it("test 1", () => {
      string = "0123456789";
      start = 0;
      compString = "0123";
      result = utility.isSameSubString(string, compString, start);
      expect(result).toBe(true);
    });

    it("test 2", () => {
      string = "0123456789";
      start = 0;
      compString = "0123";
      result = utility.isSameSubString(string, compString);
      expect(result).toBe(true);
    });

    it("test 3", () => {
      string = "0123456789";
      start = 0;
      compString = "12";
      result = utility.isSameSubString(string, compString, start);
      expect(result).toBe(false);
    });

    it("test 4", () => {
      string = "0123456789";
      start = 3;
      compString = "345";
      result = utility.isSameSubString(string, compString, start);
      expect(result).toBe(true);
    });

    it("test 5", () => {
      string = "0123456789";
      start = 3;
      compString = "456";
      result = utility.isSameSubString(string, compString, start);
      expect(result).toBe(false);
    });
  });

  describe("isUndefined", () => {
    let target = null;
    let result = false;

    beforeEach(() => {
      result = false;
    });

    it("test 1", () => {
      target = undefined;
      result = utility.isUndefined(target);
      expect(result).toBe(true);
    });

    it("test 2", () => {
      target = null;
      result = utility.isUndefined(target);
      expect(result).toBe(false);
    });

    it("test 3", () => {
      target = "";
      result = utility.isUndefined(target);
      expect(result).toBe(false);
    });
  });

  ////////
  //判定
  //比較
  ////////

  describe("caseSensitiveCompare", () => {
    let xString = "";
    let yString = "";
    let insensitive = false;
    let result = false;

    beforeEach(() => {
      result = false;
    });

    it("test 1", () => {
      xString = "ABC";
      yString = "abc";
      insensitive = false;
      result = utility.caseSensitiveCompare(xString, yString, insensitive);
      expect(result).toBe(-1);
    });

    it("test 2", () => {
      xString = "ABC";
      yString = "abc";
      //insensitive = false;
      result = utility.caseSensitiveCompare(xString, yString);
      expect(result).toBe(-1);
    });

    it("test 3", () => {
      xString = "abc";
      yString = "ABC";
      insensitive = false;
      result = utility.caseSensitiveCompare(xString, yString, insensitive);
      expect(result).toBe(1);
    });

    it("test 4", () => {
      xString = "abc";
      yString = "abc";
      insensitive = false;
      result = utility.caseSensitiveCompare(xString, yString, insensitive);
      expect(result).toBe(0);
    });

    it("test 5", () => {
      xString = "ABC";
      yString = "abc";
      insensitive = true;
      result = utility.caseSensitiveCompare(xString, yString, insensitive);
      expect(result).toBe(-1);
    });

    it("test 6", () => {
      xString = "abc";
      yString = "ABC";
      insensitive = true;
      result = utility.caseSensitiveCompare(xString, yString, insensitive);
      expect(result).toBe(1);
    });

    it("test 7", () => {
      xString = "abc";
      yString = "abc";
      insensitive = true;
      result = utility.caseSensitiveCompare(xString, yString, insensitive);
      expect(result).toBe(0);
    });

    it("test 8", () => {
      xString = "B";
      yString = "a";
      insensitive = false;
      result = utility.caseSensitiveCompare(xString, yString, insensitive);
      expect(result).toBe(-1);
    });

    it("test 9", () => {
      xString = "B";
      yString = "a";
      insensitive = true;
      result = utility.caseSensitiveCompare(xString, yString, insensitive);
      expect(result).toBe(1);
    });
  });

  describe("naturalSortCompare", () => {
    let xString = "";
    let yString = "";
    let insensitive = false;
    let result = false;

    beforeEach(() => {
      result = false;
    });

    it("test 1", () => {
      xString = "a10";
      yString = "a2";
      insensitive = false;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(1);
    });

    it("test 2", () => {
      xString = "a10";
      yString = "b10";
      insensitive = false;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(-1);
    });

    it("test 3", () => {
      xString = "a10";
      yString = "a10";
      insensitive = false;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(0);
    });

    it("test 4", () => {
      xString = "a10a";
      yString = "a10b";
      insensitive = false;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(-1);
    });

    it("test 5", () => {
      xString = "B10";
      yString = "a10";
      insensitive = false;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(-1);
    });

    it("test 6", () => {
      xString = "B10";
      yString = "a10";
      insensitive = true;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(1);
    });

    it("test 7", () => {
      xString = "abc";
      yString = "def";
      insensitive = false;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(-1);
    });

    it("test 8", () => {
      xString = "0123";
      yString = "4567";
      insensitive = false;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(-1);
    });

    it("test 9", () => {
      xString = "";
      yString = "";
      insensitive = false;
      result = utility.naturalSortCompare(xString, yString, insensitive);
      expect(result).toBe(0);
    });
  });

  ////////
  //比較
  //汎用
  ////////

  describe("getOnlySecond", () => {
    let first = [];
    let second = [];
    let result = [];

    it("test 1", () => {
      first = [1, 3];
      second = [1, 2, 3, 4];

      result = utility.getOnlySecond(first, second);
      expect(result).toEqual([2, 4]);
    });

    it("test 2", () => {
      first = [1, 3];
      second = [1, 3];

      result = utility.getOnlySecond(first, second);
      expect(result).toEqual([]);
    });

    it("test 3", () => {
      first = [];
      second = [1, 3];

      result = utility.getOnlySecond(first, second);
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
      result = utility.binarySearch(array, 6, testCompare);
      expect(result).toEqual(5);
    });

    it("test 2", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = utility.binarySearch(array, 11, testCompare);
      expect(result).toEqual(-1);
    });

    it("test 3", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = utility.binarySearch(array, 0, testCompare);
      expect(result).toEqual(-1);
    });

    it("test 4", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = utility.binarySearch(array, 1, testCompare);
      expect(result).toEqual(0);
    });

    it("test 5", () => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      result = utility.binarySearch(array, 10, testCompare);
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
      newObj = utility.shallowCopy(oldObj);

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
      newObj = utility.shallowCopy(oldObj);

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
      newObj = utility.shallowCopy(oldObj);

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
      newObj = utility.shallowCopy(oldObj);

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
      newObj = utility.deepCopy(oldObj);

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
      newObj = utility.deepCopy(oldObj);

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
      newObj = utility.deepCopy(oldObj);

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
      newObj = utility.deepCopy(oldObj);

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

  describe("returnSecondIfTrue", () => {
    let condition = false;
    let first = "first";
    let second = "second";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      condition = true;
      result = utility.returnSecondIfTrue(condition, first, second);
      expect(result).toBe(second);
    });

    it("test 2", () => {
      condition = false;
      result = utility.returnSecondIfTrue(condition, first, second);
      expect(result).toBe(first);
    });
  });

  describe("executeIfTrue", () => {
    let condition = false;
    let func = (x, y) => {
      return x + y;
    };
    let x = 1;
    let y = 2;
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      condition = true;
      result = utility.executeIfTrue(condition, func, x, y);
      expect(result).toBe(3);
    });

    it("test 2", () => {
      condition = false;
      result = utility.executeIfTrue(condition, func, x, y);
      expect(result).toBe(null);
    });

    it("test 3", () => {
      condition = true;
      func = () => {
        return 3;
      };
      result = utility.executeIfTrue(condition, func);
      expect(result).toBe(3);
    });
  });

  describe("shallowCopyTargetProperty", () => {
    let source = {};
    let destination = {};

    it("test 1", () => {
      source = { "a": 1, "b": 2, "c": 3 };
      destination = { "a": "a", "b": "b", "c": "c" };

      utility.shallowCopyTargetProperty(source, destination);
      expect(destination).toEqual({ "a": 1, "b": 2, "c": 3 });
      //console.log(source, destination);
    });

    it("test 2", () => {
      source = { "a": 1, "b": 2 };
      destination = { "a": "a", "b": "b", "c": "c" };

      utility.shallowCopyTargetProperty(source, destination);
      expect(destination).toEqual({ "a": 1, "b": 2, "c": "c" });
      //console.log(source, destination);
    });

    it("test 3", () => {
      source = { "a": 1, "b": 2, "c": 3 };
      destination = { "a": "a", "b": "b" };

      utility.shallowCopyTargetProperty(source, destination);
      expect(destination).toEqual({ "a": 1, "b": 2 });
      //console.log(source, destination);
    });
  });

  describe("toArrayBuffer", () => {
    let buf = Buffer.from([]);
    let ab = new ArrayBuffer(0);
    let comp = new ArrayBuffer(4);
    let view = new Uint8Array(comp);
    for (let i = 0; i < comp.length; ++i) {
      view[i] = i + 1;
    }

    beforeEach(() => {
      ab = new ArrayBuffer(0);
    });

    it("test 1", () => {
      buf = Buffer.from([1, 2, 3, 4]);
      ab = utility.toArrayBuffer(buf);

      expect(ab).toEqual(comp);
      //console.log(ab, buf, comp);
    });
  });

  describe("toBuffer", () => {
    let buf = Buffer.from([]);
    let ab = new ArrayBuffer(0);
    let comp = Buffer.from([1, 2, 3, 4]);

    beforeEach(() => {
      buf = Buffer.from([]);
    });

    it("test 1", () => {
      ab = new ArrayBuffer(4);
      let view = new Uint8Array(ab);
      for (let i = 0; i < comp.length; ++i) {
        view[i] = i + 1;
      }
      buf = utility.toBuffer(ab);

      expect(buf).toEqual(comp);
      //console.log(ab, buf, comp);
    });
  });

  ////////
  ////////

  describe("stringToNumber", () => {
    let string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "12345";
      result = utility.stringToNumber(string);
      expect(result).toBe(12345);
    });

    it("test 2", () => {
      string = "+12345";
      result = utility.stringToNumber(string);
      expect(result).toBe(12345);
    });

    it("test 3", () => {
      string = "-12345";
      result = utility.stringToNumber(string);
      expect(result).toBe(-12345);
    });

    it("test 4", () => {
      string = "";
      result = utility.stringToNumber(string);
      expect(result).toBeNaN();
    });

    it("test 5", () => {
      string = "123.45";
      result = utility.stringToNumber(string);
      expect(result).toBe(123.45);
    });

    it("test 6", () => {
      string = "123.0";
      result = utility.stringToNumber(string);
      expect(result).toBe(123);
      //console.log(result);
    });

    it("test 7", () => {
      string = "123.";
      result = utility.stringToNumber(string);
      expect(result).toBeNaN();
      //console.log(result);
    });

    it("test 8", () => {
      string = "123.45e2";
      result = utility.stringToNumber(string);
      expect(result).toBe(12345);
      //console.log(result);
    });

    it("test 9", () => {
      string = "123.45e+2";
      result = utility.stringToNumber(string);
      expect(result).toBe(12345);
      //console.log(result);
    });

    it("test 10", () => {
      string = "123.45e-2";
      result = utility.stringToNumber(string);
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
      result = utility.stringToBoolean(string);
      expect(result).toBe(true);
    });

    it("test 2", () => {
      string = "false";
      result = utility.stringToBoolean(string);
      expect(result).toBe(false);
    });

    it("test 3", () => {
      string = "";
      result = utility.stringToBoolean(string);
      expect(result).toBe(false);
    });

    it("test 4", () => {
      string = "cat";
      result = utility.stringToBoolean(string);
      expect(result).toBe(false);
    });
  });

  describe("unicodeEscapeSequenceReplacer", () => {
    let _match = "";
    let p1 = "";
    let _offset = 0;
    let _string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      p1 = "0040";
      result = utility.unicodeEscapeSequenceReplacer(_match, p1, _offset, _string);
      expect(result).toBe("@");
    });

    it("test 2", () => {
      p1 = "2000B";
      result = utility.unicodeEscapeSequenceReplacer(_match, p1, _offset, _string);
      expect(result).toBe("𠀋");
    });
  });

  describe("unicodeEscapeSequenceToChar", () => {
    let string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "this is \\u{0040}";
      result = utility.unicodeEscapeSequenceToChar(string);
      expect(result).toBe("this is @");
      //console.log(string, result);
    });

    it("test 2", () => {
      string = "this is \\u{2000B}";
      result = utility.unicodeEscapeSequenceToChar(string);
      expect(result).toBe("this is 𠀋");
      //console.log(string, result);
    });
  });

  describe("stringToRegex", () => {
    let string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "/.+/g";
      result = utility.stringToRegex(string);
      expect(result).toEqual(/.+/g);
      //console.log(string, result);
    });
    it("test 2", () => {
      string = "/.+/gimy";
      result = utility.stringToRegex(string);
      expect(result).toEqual(/.+/gimy);
      //console.log(string, result);
    });
    it("test 3", () => {
      string = "";
      result = utility.stringToRegex(string);
      expect(result).toBe(null);
      //console.log(string, result);
    });
    it("test 4", () => {
      string = null;
      result = utility.stringToRegex(string);
      expect(result).toBe(null);
      //console.log(string, result);
    });
    it("test 5", () => {
      string = "abc";
      result = utility.stringToRegex(string);
      expect(result).toBe(null);
      //console.log(string, result);
    });
    it("test 6", () => {
      string = "/.+/gii";
      result = utility.stringToRegex(string);
      expect(result).toBe(null);
      //console.log(string, result);
    });
  });

  describe("getSubStr", () => {
    let string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "0123456789";
      result = utility.getSubStr(string, 0, 2);
      expect(result).toBe("01");
      //console.log(string, result);
    });

    it("test 2", () => {
      string = "0123456789";
      result = utility.getSubStr(string, 2, 4);
      expect(result).toBe("2345");
      //console.log(string, result);
    });

    it("test 3", () => {
      string = "0123456789";
      result = utility.getSubStr(string, -1, 2);
      expect(result).toBe("");
      //console.log(string, result);
    });

    it("test 4", () => {
      string = "0123456789";
      result = utility.getSubStr(string, 9, 2);
      expect(result).toBe("");
      //console.log(string, result);
    });

    it("test 5", () => {
      string = "0123456789";
      result = utility.getSubStr(string, 1, 11);
      expect(result).toBe("");
      //console.log(string, result);
    });

    it("test 6", () => {
      string = "0123456789";
      result = utility.getSubStr(string, 0, 10);
      expect(result).toBe("0123456789");
      //console.log(string, result);
    });
  });

  describe("returnSecondIfEmptyString", () => {
    let first = "";
    let second = "second";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      first = "";
      result = utility.returnSecondIfEmptyString(first, second);
      expect(result).toBe(second);
    });

    it("test 2", () => {
      first = "first";
      result = utility.returnSecondIfEmptyString(first, second);
      expect(result).toBe(first);
    });
  });

  describe("enclose", () => {
    let string = "0123456789";
    let openString = "";
    let closeString = "";
    let result = "";

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      openString = "";
      closeString = "";
      result = utility.enclose(string, openString, closeString);
      expect(result).toBe("0123456789");
    });

    it("test 2", () => {
      openString = "";
      closeString = "";
      result = utility.enclose(string);
      expect(result).toBe("\"0123456789\"");
    });
    it("test 3", () => {
      openString = "<";
      closeString = ">";
      result = utility.enclose(string, openString, closeString);
      expect(result).toBe("<0123456789>");
    });
  });

  describe("toPaddedString", () => {
    let num = 0;
    let radix = 10;
    let digits = 0;
    let upperCase = false;
    let paddingChar = "";
    let sign = "";
    let align = "";
    let result = "";

    beforeEach(() => {
      result = "";
    });

    it("test 1", () => {
      num = 10;
      radix = 10;
      digits = 0;
      upperCase = false;
      paddingChar = "";
      sign = "minus";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("10");
      //console.log(result);
    });

    it("test 2", () => {
      num = 10;
      radix = 16;
      digits = 0;
      upperCase = false;
      paddingChar = "";
      sign = "minus";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("a");
      //console.log(result);
    });

    it("test 3", () => {
      num = 10;
      radix = 16;
      digits = 0;
      upperCase = true;
      paddingChar = "";
      sign = "minus";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("A");
      //console.log(result);
    });

    it("test 4", () => {
      num = 10;
      radix = 10;
      digits = 4;
      upperCase = true;
      paddingChar = "_";
      sign = "minus";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("10__");
      //console.log(result);
    });

    it("test 5", () => {
      num = 10;
      radix = 10;
      digits = 2;
      upperCase = true;
      paddingChar = "_";
      sign = "minus";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("10");
      //console.log(result);
    });

    it("test 6", () => {
      num = 10;
      radix = 10;
      digits = 4;
      upperCase = true;
      paddingChar = "_";
      sign = "plus";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("+10_");
      //console.log(result);
    });
    it("test 7", () => {
      num = 10;
      radix = 10;
      digits = 4;
      upperCase = true;
      paddingChar = "_";
      sign = "space";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe(" 10_");
      //console.log(result);
    });

    it("test 8", () => {
      num = -10;
      radix = 10;
      digits = 4;
      upperCase = true;
      paddingChar = "_";
      sign = "minus";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("-10_");
      //console.log(result);
    });

    it("test 9", () => {
      num = -10;
      radix = 10;
      digits = 4;
      upperCase = true;
      paddingChar = "_";
      sign = "plus";
      align = "left";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("-10_");
      //console.log(result);
    });

    it("test 10", () => {
      num = 10;
      radix = 10;
      digits = 4;
      upperCase = true;
      paddingChar = "_";
      sign = "plus";
      align = "right";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("_+10");
      //console.log(result);
    });

    it("test 11", () => {
      num = 10;
      radix = 10;
      digits = 4;
      upperCase = true;
      paddingChar = "_";
      sign = "plus";
      align = "right_lead_sign";
      result = utility.toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align);
      expect(result).toBe("+_10");
      //console.log(result);
    });
  });

  describe("countSequentialChar", () => {
    let string = "";
    let index = 0;
    let char = "";
    let direction = 1;
    let result = "";

    beforeEach(() => {
      result = "";
    });

    it("test 1", () => {
      string = "abbcccddddeeeee";
      index = 6;
      char = "c";
      direction = -1;
      result = utility.countSequentialChar(string, index, char, direction);
      expect(result).toBe(3);
      //console.log(result);
    });

    it("test 2", () => {
      string = "abbcccddddeeeee";
      index = 3;
      char = "c";
      direction = -1;
      result = utility.countSequentialChar(string, index, char, direction);
      expect(result).toBe(0);
      //console.log(result);
    });

    it("test 3", () => {
      string = "abbcccddddeeeee";
      index = 10;
      char = "c";
      direction = -1;
      result = utility.countSequentialChar(string, index, char, direction);
      expect(result).toBe(0);
      //console.log(result);
    });

    it("test 4", () => {
      string = "";
      index = 10;
      char = "c";
      direction = -1;
      result = utility.countSequentialChar(string, index, char, direction);
      expect(result).toBe(0);
      //console.log(result);
    });

    it("test 5", () => {
      string = "abbcccddddeeeee";
      index = 2;
      char = "c";
      direction = 1;
      result = utility.countSequentialChar(string, index, char, direction);
      expect(result).toBe(3);
      //console.log(result);
    });

    it("test 6", () => {
      string = "abbcccddddeeeee";
      index = 2;
      char = "c";
      //direction = 1;
      result = utility.countSequentialChar(string, index, char);
      expect(result).toBe(3);
      //console.log(result);
    });
  });

  describe("separateAlphabetNumber", () => {
    let string = "";
    let result = [];

    beforeEach(() => {
      result = [];
    });

    it("test 1", () => {
      string = "abc123def456";
      result = utility.separateAlphabetNumber(string);
      expect(result).toEqual(["abc", "123", "def", "456"]);
      //console.log(result);
    });

    it("test 2", () => {
      string = "123abc456def";
      result = utility.separateAlphabetNumber(string);
      expect(result).toEqual(["123", "abc", "456", "def"]);
      //console.log(result);
    });

    it("test 3", () => {
      string = "";
      result = utility.separateAlphabetNumber(string);
      expect(result).toEqual([""]);
      //console.log(result);
    });

    it("test 4", () => {
      string = "abcdef";
      result = utility.separateAlphabetNumber(string);
      expect(result).toEqual(["abcdef"]);
      //console.log(result);
    });

    it("test 5", () => {
      string = "123456";
      result = utility.separateAlphabetNumber(string);
      expect(result).toEqual(["123456"]);
      //console.log(result);
    });
  });

  describe("getEnclosedStringDifferent", () => {
    let string = "";
    let include = true;
    let openString = "";
    let closeString = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "0123<456>789";
      openString = "<";
      closeString = ">";
      include = true;
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<456>"]);
      //console.log(result);
    });

    it("test 2", () => {
      string = "0123<456>789";
      openString = "<";
      closeString = ">";
      //include = true;
      result = utility.getEnclosedStringDifferent(string, openString, closeString);
      expect(result).toEqual(["<456>"]);
      //console.log(result);
    });

    it("test 3", () => {
      string = "0123<456>789";
      openString = "<";
      closeString = ">";
      include = false;
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["456"]);
      //console.log(result);
    });

    it("test 4", () => {
      string = "0123<<456>>789";
      include = true;
      openString = "<<";
      closeString = ">>";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<<456>>"]);
      //console.log(result);
    });

    it("test 5", () => {
      string = "";
      include = true;
      openString = "<";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual([]);
      //console.log(result);
    });

    it("test 6", () => {
      string = "0123<456>789";
      include = true;
      openString = "";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual([]);
      //console.log(result);
    });

    it("test 7", () => {
      string = "0123<456>789";
      include = true;
      openString = "<";
      closeString = "";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual([]);
      //console.log(result);
    });

    it("test 8", () => {
      string = "012<3<456>7>89";
      include = true;
      openString = "<";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<456>", "<3<456>7>"]);
      //console.log(result);
    });

    it("test 7", () => {
      string = "012<3<4567>89";
      include = true;
      openString = "<";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<4567>"]);
      //console.log(result);
    });

    it("test 8", () => {
      string = "012<345>67>89";
      include = true;
      openString = "<";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<345>"]);
      //console.log(result);
    });

    it("test 9", () => {
      string = "012<345>6<789>";
      include = true;
      openString = "<";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<345>", "<789>"]);
      //console.log(result);
    });

    it("test 10", () => {
      string = "012<<3><4<5>6><7>>89";
      include = true;
      openString = "<";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<3>", "<5>", "<4<5>6>", "<7>", "<<3><4<5>6><7>>"]);
      //console.log(result);
    });

    it("test 11", () => {
      string = "012<3\\<4567>89";
      include = true;
      openString = "<";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<3\\<4567>"]);
      //console.log(result);
    });

    it("test 12", () => {
      string = "012<345\\>67>89";
      include = true;
      openString = "<";
      closeString = ">";
      result = utility.getEnclosedStringDifferent(string, openString, closeString, include);
      expect(result).toEqual(["<345\\>67>"]);
      //console.log(result);
    });
  });

  describe("getEnclosedStringSame", () => {
    let string = "";
    let include = true;
    let encloseString = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "0123\"456\"789";
      encloseString = "\"";
      include = true;
      result = utility.getEnclosedStringSame(string, encloseString, include);
      expect(result).toEqual(["\"456\""]);
      //console.log(result);
    });

    it("test 2", () => {
      string = "0123\"456\"789";
      encloseString = "\"";
      //include = true;
      result = utility.getEnclosedStringSame(string, encloseString);
      expect(result).toEqual(["\"456\""]);
      //console.log(result);
    });

    it("test 3", () => {
      string = "0123\"456\"789";
      encloseString = "\"";
      include = false;
      result = utility.getEnclosedStringSame(string, encloseString, include);
      expect(result).toEqual(["456"]);
      //console.log(result);
    });

    it("test 4", () => {
      string = "01\"23\"45\"67\"89";
      encloseString = "\"";
      include = false;
      result = utility.getEnclosedStringSame(string, encloseString, include);
      expect(result).toEqual(["23", "67"]);
      //console.log(result);
    });

    it("test 5", () => {
      string = "01\"23\"4567\"89";
      encloseString = "\"";
      include = false;
      result = utility.getEnclosedStringSame(string, encloseString, include);
      expect(result).toEqual(["23"]);
      //console.log(result);
    });

    it("test 6", () => {
      string = "";
      include = true;
      encloseString = "\"";
      result = utility.getEnclosedStringSame(string, encloseString, include);
      expect(result).toEqual([]);
      //console.log(result);
    });

    it("test 7", () => {
      string = "0123\"456\"789";
      include = true;
      encloseString = "";
      result = utility.getEnclosedStringSame(string, encloseString, include);
      expect(result).toEqual([]);
      //console.log(result);
    });
  });

  describe("getEnclosedString", () => {
    let string = "";
    let include = true;
    let openString = "";
    let closeString = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "0123\"456\"789";
      openString = "\"";
      closeString = "\"";
      include = true;
      result = utility.getEnclosedString(string, openString, closeString, include);
      expect(result).toEqual(["\"456\""]);
      //console.log(result);
    });

    it("test 2", () => {
      string = "0123<456>789";
      openString = "<";
      closeString = ">";
      include = true;
      result = utility.getEnclosedString(string, openString, closeString, include);
      expect(result).toEqual(["<456>"]);
      //console.log(result);
    });
  });

  describe("splitString", () => {
    let string = "";
    let separator = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "012,345,678,9";
      separator = ",";
      result = utility.splitString(string, separator);
      expect(result).toEqual(["012", "345", "678", "9"]);
      //console.log(result);
    });

    it("test 2", () => {
      string = "012,345,678,9";
      //separator = ",";
      result = utility.splitString(string);
      expect(result).toEqual(["012", "345", "678", "9"]);
      //console.log(result);
    });

    it("test 3", () => {
      string = "012,345\\,678,9";
      separator = ",";
      result = utility.splitString(string, separator);
      expect(result).toEqual(["012", "345\\,678", "9"]);
      //console.log(result);
    });
  });

  describe("splitStringWithSeparator", () => {
    let string = "";
    let separator = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "012,345,678,9";
      separator = ",";
      result = utility.splitStringWithSeparator(string, separator);
      expect(result).toEqual(["012,", "345,", "678,", "9"]);
      //console.log(result);
    });

    it("test 2", () => {
      string = "012";
      separator = "";
      result = utility.splitStringWithSeparator(string, separator);
      expect(result).toEqual(["0", "1", "2"]);
      //console.log(result);
    });

    it("test 3", () => {
      string = "012";
      //separator = "";
      result = utility.splitStringWithSeparator(string);
      expect(result).toEqual(["0", "1", "2"]);
      //console.log(result);
    });
  });

  describe("removeEscape", () => {
    let string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "01\\234\\567\\\\89";
      result = utility.removeEscape(string);
      expect(result).toEqual("01234567\\89");
      //console.log(result);
    });

    it("test 2", () => {
      string = "0123456789";
      result = utility.removeEscape(string);
      expect(result).toEqual("0123456789");
      //console.log(result);
    });
  });

  describe("escapeSpecialCharacters", () => {
    let string = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "012\\^$*+?.()|{}[]abc";
      result = utility.escapeSpecialCharacters(string);
      expect(result).toEqual("012\\\\\\^\\$\\*\\+\\?\\.\\(\\)\\|\\{\\}\\[\\]abc");
      //console.log(result);
    });

    it("test 2", () => {
      string = "0123456789";
      result = utility.escapeSpecialCharacters(string);
      expect(result).toEqual("0123456789");
      //console.log(result);
    });

    it("test 3", () => {
      string = "";
      result = utility.escapeSpecialCharacters(string);
      expect(result).toEqual("");
      //console.log(result);
    });
  });

  describe("stringToNumberArray", () => {
    let string = "";
    let separator = "";
    let setNaN = null;
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      string = "123a";
      separator = "";
      setNaN = null;
      result = utility.stringToNumberArray(string, separator, setNaN);
      expect(result).toEqual([1, 2, 3, NaN]);
      //console.log(result);
    });

    it("test 2", () => {
      string = "123a";
      separator = "";
      setNaN = 0;
      result = utility.stringToNumberArray(string, separator, setNaN);
      expect(result).toEqual([1, 2, 3, 0]);
      //console.log(result);
    });

    it("test 3", () => {
      string = "123a";
      separator = "";
      //setNaN = null;
      result = utility.stringToNumberArray(string, separator);
      expect(result).toEqual([1, 2, 3, NaN]);
      //console.log(result);
    });

    it("test 4", () => {
      string = "123a";
      //separator = "";
      //setNaN = null;
      result = utility.stringToNumberArray(string);
      expect(result).toEqual([1, 2, 3, NaN]);
      //console.log(result);
    });

    it("test 5", () => {
      string = "12,34,56";
      separator = ",";
      setNaN = 0;
      result = utility.stringToNumberArray(string, separator, setNaN);
      expect(result).toEqual([12, 34, 56]);
      //console.log(result);
    });
  });

  ////////
  ////////

  describe("pushNotEmptyString", () => {
    let array = [];
    let data = "";

    it("test 1", () => {
      array = ["1", "2"];
      data = "";
      utility.pushNotEmptyString(array, data);
      expect(array).toEqual(["1", "2"]);
    });

    it("test 2", () => {
      array = ["1", "2"];
      data = "3";
      utility.pushNotEmptyString(array, data);
      expect(array).toEqual(["1", "2", "3"]);
      //console.log(array);
    });
  });

  describe("shallowCopyReversedArray", () => {
    let array = [];
    let result = [];

    beforeEach(() => {
      result = [];
    });

    it("test 1", () => {
      array = ["1", "2", "3"];
      result = utility.shallowCopyReversedArray(array);
      expect(result).toEqual(["3", "2", "1"]);
    });

    it("test 2", () => {
      array = ["1"];
      result = utility.shallowCopyReversedArray(array);
      expect(result).toEqual(["1"]);
    });

    it("test 3", () => {
      array = [];
      result = utility.shallowCopyReversedArray(array);
      expect(result).toEqual([]);
    });
  });

  describe("spliceArray", () => {
    let array = [];
    let index = 0;
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      array = [1, 2, 3];
      index = 1;
      result = utility.spliceArray(array, index);
      expect(array).toEqual([1, 3]);
      expect(result).toBe(2);
    });

    it("test 2", () => {
      array = [1, 2, 3];
      index = -1;
      result = utility.spliceArray(array, index);
      expect(array).toEqual([1, 2]);
      expect(result).toBe(3);
    });

    it("test 3", () => {
      array = [1, 2, 3];
      index = 4;
      result = utility.spliceArray(array, index);
      expect(array).toEqual([1, 2, 3]);
      expect(result).toBeUndefined();
    });

    it("test 4", () => {
      array = [];
      index = 1;
      result = utility.spliceArray(array, index);
      expect(array).toEqual([]);
      expect(result).toBeUndefined();
    });
  });

  describe("uniqueFilter", () => {
    let e = 0;
    let i = 0;
    let arr = [];
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      e = 0;
      i = 0;
      arr = [0, 1, 1, 4, 4];
      result = utility.uniqueFilter(e, i, arr);
      expect(result).toBe(true);
    });

    it("test 2", () => {
      e = 1;
      i = 1;
      arr = [0, 1, 1, 4, 4];
      result = utility.uniqueFilter(e, i, arr);
      expect(result).toBe(true);
    });

    it("test 3", () => {
      e = 1;
      i = 2;
      arr = [0, 1, 1, 4, 4];
      result = utility.uniqueFilter(e, i, arr);
      expect(result).toBe(false);
    });
  });

  describe("uniqueArray", () => {
    let array = [];
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      array = [0, 1, 1, 4, 4];
      result = utility.uniqueArray(array);
      expect(result).toEqual([0, 1, 4]);
    });

    it("test 2", () => {
      array = [0, 1, 4];
      result = utility.uniqueArray(array);
      expect(result).toEqual([0, 1, 4]);
    });
  });

  describe("filterArrayData", () => {
    let array = [];
    let data = [];
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      array = [0, 1, 2, 3, 4];
      data = [0, 2, 4];
      result = utility.filterArrayData(array, data);
      expect(result).toEqual([1, 3]);
    });

    it("test 2", () => {
      array = [0, 1, 2, 3, 4];
      data = [];
      result = utility.filterArrayData(array, data);
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe("filterArrayRange", () => {
    let array = [];
    let min = 0;
    let max = 0;
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      array = [0, 1, 2, 3, 4];
      min = 1;
      max = 3;
      result = utility.filterArrayRange(array, min, max);
      expect(result).toEqual([1, 2, 3]);
    });

    it("test 2", () => {
      array = [0, 1, 2, 3, 4];
      min = 1;
      max = null;
      result = utility.filterArrayRange(array, min, max);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it("test 3", () => {
      array = [0, 1, 2, 3, 4];
      min = null;
      max = 3;
      result = utility.filterArrayRange(array, min, max);
      expect(result).toEqual([0, 1, 2, 3]);
    });

    it("test 4", () => {
      array = [0, 1, 2, 3, 4];
      min = null;
      max = null;
      result = utility.filterArrayRange(array, min, max);
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it("test 5", () => {
      array = [0, 1, 2, 3, 4];
      min = null;
      max = null;
      result = utility.filterArrayRange(array);
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });
  });

  //////
  //////

  describe("getAllMatches", () => {
    let regex = null;
    let string = "";
    let result = [];

    beforeEach(() => {
      result = [];
    });

    it("test 1", () => {
      regex = /234/g;
      string = "0123456789";
      result = utility.getAllMatches(regex, string);
      expect(result).toEqual([
        ["234", 3, 2, 5],
      ]);
    });

    it("test 2", () => {
      regex = /234/g;
      string = "01234567890123456789";
      result = utility.getAllMatches(regex, string);
      expect(result).toEqual([
        ["234", 3, 2, 5],
        ["234", 3, 12, 15],
      ]);
    });

    it("test 3", () => {
      regex = /2.*2/g;
      string = "01234567890123456789";
      result = utility.getAllMatches(regex, string);
      expect(result).toEqual([
        ["23456789012", 11, 2, 13],
      ]);
    });

    it("test 4", () => {
      regex = /^/g;
      string = "01234567890123456789";
      result = utility.getAllMatches(regex, string);
      expect(result).toEqual([
        ["", 0, 0, 0],
      ]);
      //console.log(result);
    });

    it("test 5", () => {
      regex = /(?=2)/g;
      string = "01234567890123456789";
      result = utility.getAllMatches(regex, string);
      expect(result).toEqual([
        ["", 0, 2, 2],
        ["", 0, 12, 12],
      ]);
      //console.log(result);
    });

    it("test 6", () => {
      regex = /234/;
      string = "01234567890123456789";
      result = utility.getAllMatches(regex, string);
      expect(result).toEqual([]);
    });

    it("test 7", () => {
      regex = /abc/g;
      string = "01234567890123456789";
      result = utility.getAllMatches(regex, string);
      expect(result).toEqual([]);
    });
  });

  describe("countCapturingGroup", () => {
    let string = "";
    let result = -1;

    beforeEach(() => {
      result = -1;
    });

    it("test 1", () => {
      string = "(abc)(abc)(abc)";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(3);
    });

    it("test 2", () => {
      string = "(abc(abc))(abc)";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(3);
    });

    it("test 3", () => {
      string = "(abc(abc(abc)))";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(3);
    });

    it("test 1", () => {
      string = "(abc)abc)(abc)";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(2);
    });

    it("test 2", () => {
      string = "(abc(abc)(abc)";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(2);
    });

    it("test 3", () => {
      string = "(abc(abc(abc";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(0);
    });

    it("test 4", () => {
      string = "\\(abc\\)";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(0);
    });

    it("test 5", () => {
      string = "\\\\(abc\\\\)";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(1);
    });

    it("test 6", () => {
      string = "\\\\\\(abc\\\\\\)";
      result = utility.countCapturingGroup(string);
      expect(result).toBe(0);
    });
  });

  ////////
  ////////

  describe("logLine", () => {
    let data = [1, 2, 3, 4];

    it("test 1", () => {
      spyOn(console, "log");
      utility.logLine(...data);

      expect(console.log).toHaveBeenCalledWith(1);
      expect(console.log).toHaveBeenCalledWith(2);
      expect(console.log).toHaveBeenCalledWith(3);
      expect(console.log).toHaveBeenCalledWith(4);
      expect(console.log.calls.count()).toBe(4);
    });
  });

  describe("logProperty", () => {
    let data = { "a": 1, "b": 2 };

    it("test 1", () => {
      spyOn(console, "log");
      utility.logProperty(data, "a");

      expect(console.log).toHaveBeenCalledWith("a", data.a);
      expect(console.log.calls.count()).toBe(1);
    });
  });

  describe("logRegex", () => {
    let regex = /abc/g;

    it("test 1", () => {
      spyOn(console, "log");
      utility.logRegex(regex);

      expect(console.log).toHaveBeenCalledWith("source", regex["source"]);
      expect(console.log).toHaveBeenCalledWith("lastIndex", regex["lastIndex"]);
      expect(console.log).toHaveBeenCalledWith("ignoreCase", regex["ignoreCase"]);
      expect(console.log).toHaveBeenCalledWith("multiline", regex["multiline"]);
      expect(console.log.calls.count()).toBe(4);
    });
  });
});

/*
  describe("utility.returnSecondIfTrue", () => {
    let condition = false;
    let first = "first";
    let second = "second";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    it("test 1", () => {
      condition = true;
      result = utility.returnSecondIfTrue(condition, first, second);
      expect(result).toBe(second);
    });

    it("test 2", () => {
      condition = false;
      result = utility.returnSecondIfTrue(condition, first, second);
      expect(result).toBe(first);
    });
  });
 */

"use babel";

//////////
//const
//////////

/**
 * 数値とマッチする正規表現
 * @const {RegExp}
 */
const kNumberRegex = /[-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?/;

/**
 * 数値とマッチする正規表現(グローバル)
 * @const {RegExp}
 */
const kNumberRegexG = /[-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?/g;

//////////
//判定
//////////

/**
 * 引数が空か否か
 * @param  {any}  obj : 検査したい変数
 * @return {Boolean} : 空(null or undefined)ならばtrue
 */
function isEmpty(obj) {
  if (typeof obj === "undefined" || obj === null) {
    return true;
  }
  return false;
}

/**
 * 空文字列か否か
 * @param  {any}  str : 検査したい変数
 * @return {Boolean} : 空文字列(null, undefined or "")ならば true
 */
function isEmptyString(str) {
  if (isEmpty(str) === true || str === "") {
    return true;
  }
  return false;
}

/**
 * 空オブジェクトか否か。enumerable を含めるかどうかで分けないといけないかも
 * @param  {any}  obj : 検査したい変数
 * @return {Boolean} : 空オブジェクト(null, undefined or {})ならば true
 */
function isEmptyObject(obj) {
  if (isEmpty(obj) === true) {
    return true;
  }
  if (Object.getOwnPropertyNames(obj).length === 0) {
    //if (Object.keys(obj).length === 0 && Object.getOwnPropertyNames(obj).length === 0) {
    return true;
  }
  return false;
}

/**
 * 引数が有効な範囲の整数か否か(整数と認識できるか)。 2.0などは整数と判定される
 * @param  {any} num : 検査したい変数
 * @param  {integer} minimum : 最小値。任意
 * @param  {integer} maximam : 最大値。任意
 * @return {boolean} 有効な範囲の整数なら true
 */
function checkInteger(num, minimum = null, maximam = null) {
  if (Number.isInteger(num) === true) {
    if (!isEmpty(minimum) && num < minimum) {
      return false;
    }
    if (!isEmpty(maximam) && num > maximam) {
      return false;
    }
    return true;
  }
  return false;
}

/**
 * オブジェクトの値が同じか判定する
 * @param  {object}  obj1 : 判定するオブジェクト
 * @param  {object}  obj2 : 判定するオブジェクト
 * @return {Boolean} 等しければtrue
 */
function isEqualObj(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  let result = false;

  for (let key of Object.keys(obj1)) {
    if (obj2.hasOwnProperty(key) === false) {
      return false;
    }

    if (typeof obj1[key] === "object") {
      result = isEqualObj(obj1[key], obj2[key]);
      if (result === false) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

/**
 * 指定されたインデックスの文字がエスケープされているか判定する
 * @param  {string}  string 文字列全体
 * @param  {integer}  index : 判定位置
 * @return {Boolean} : エスケープされているとtrue
 */
function isEscapedChar(string, index) {
  if (countSequentialChar(string, index, "\\", -1) % 2 === 1) {
    return true;
  }
  return false;
}

/**
 * 文字列の指定した位置が、比較文字列と同じか調べる
 * @param  {string}  string : 調べたい文字列
 * @param  {string}  compString : 比較文字列
 * @param  {integer}  start : 開始位置
 * @return {Boolean} : 同じならばtrue,
 */
function isSameSubString(string, compString, start = 0) {
  return string.substr(start, compString.length) === compString;
}

/**
 * undefinedか判定する
 * @param {any} target : 判定したい変数
 * @return {Boolean} : undefinedならばtrue
 */
function isUndefined(target) {
  return typeof target === "undefined";
}

//////////
//判定 終了
//////////

//////////
//汎用 開始
//////////

/**
 * firstとsecondを比べて、secondに含まれる要素だけの配列を返す
 * @param  {array} first : 比較用配列
 * @param  {array} second  : 操作対象が含まれる配列
 * @return {array} : secondのみに含まれる要素で構成された配列
 */
function getOnlySecond(first, second) {
  const kErr = -1;
  let result = [];

  for (let data of second) {
    if (first.indexOf(data) === kErr) {
      result.push(data);
    }
  }
  return result;
}

/**
 * 配列を2分探索する
 * @param  {array} array : 配列
 * @param  {any} target : 検索した要素
 * @param  {function} compare : 比較関数
 * @return {integer} : 見つかった場所を表す配列のインデックス
 */
function binarySearch(array, target, compare) {
  let left = 0;
  let right = array.length - 1;
  let middle = 0;
  let cmp = 0;

  while (left <= right) {
    middle = Math.floor((left + right) / 2); //( left + right ) >> 1;
    cmp = compare(target, array[middle]);
    if (cmp === 0) {
      return middle;
    }
    if (cmp < 0) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return -1;
}

/**
 * shallowCopy object
 * @param  {object} obj : コピーしたいオブジェクト
 * @return {object} : コピーされたオブジェクト
 */
function shallowCopy(obj) {
  if (typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj) === true) {
    return obj.concat();
  }
  return Object.assign({}, obj);
}

/**
 * deepCopy object
 * @param  {object} obj :コピーしたいオブジェクト
 * @return {object} : コピーされたオブジェクト
 */
function deepCopy(obj) {
  if (typeof obj !== "object") {
    return obj;
  }

  let result = {};
  if (Array.isArray(obj) === true) {
    result = [];
  }
  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === "object") {
      result[key] = deepCopy(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * sourceとdestinationで共通のプロパティの値をdestinationへコピーする
 * @param  {object} source : コピー元のオブジェクト
 * @param  {object} destination : コピー先のオブジェクト
 * @return {none} :
 */
//targetとsourceで共通のプロパティをコピーする
function shallowCopyTargetProperty(source, destination) {
  for (let key of Object.keys(source)) {
    if (destination.hasOwnProperty(key)) {
      destination[key] = shallowCopy(source[key]);
    }
  }
}

/**
 * NodeのBufferをArrayBufferに変換する。 拾い物
 * @param  {Buffer} buf : 変換したいBuffer
 * @return {ArrayBuffer} : 変換されたArrayBuffer
 */
function toArrayBuffer(buf) {
  let ab = new ArrayBuffer(buf.length);
  let view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

/**
 * ArrayBufferをNodeのBufferに変換する。 拾い物
 * @param  {ArrayBuffer} ab : 変換したいArrayBuffer
 * @return {Buffer} : 変換されたBuffer
 */
function toBuffer(ab) {
  let buf = Buffer.alloc(ab.byteLength);
  let view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

//////////
//文字列
//////////

//先頭に+を許すかどうか
/**
 * kNumberRegexにマッチする文字列を数値に変更する。マッチしない場合はNaNを返す
 * @param  {string} string : 変換したい数値を表す文字列
 * @return {number} : 変換後の数値       [description]
 */
function stringToNumber(string) {
  let result = kNumberRegex.exec(string);
  if (result === null || string.length !== result[0].length) {
    return NaN;
  }
  return Number(result[0]); //new なしだと数値を返す
}

/**
 * 文字列が"true"ならばtrueを返す。それ以外はfalse
 * @param  {string} string : 変換したい文字列
 * @return {boolean} : 変換後の真偽値
 */
function stringToBoolean(string) {
  return string === "true";
}

/**
 * string.replace用replacer。 CodePointを文字に直す
 * @param  {string} _match : 使用しない
 * @param  {string} p1 : 変換したい文字列. first capturing group
 * @param  {integer} _offset : 使用しない
 * @param  {string} _string : 使用しない
 * @return {string} : 変換された文字列
 */
function unicodeEscapeSequenceReplacer(_match, p1, _offset, _string) {
  return String.fromCodePoint(parseInt(p1, 16));
}

/**
 * 文字列に含まれる unicodeEscapeSequence を通常の?文字に変換する
 * @param  {string} string 変換したい文字列
 * @return {string} : 変換された文字列
 */
function unicodeEscapeSequenceToChar(string) {
  const kUnicode = /\\u{?([A-Fa-f0-9]+)}?/g;

  return string.replace(kUnicode, unicodeEscapeSequenceReplacer);
}

/**
 * 正規表現を表す文字列を正規表現オブジェクトに変換する
 * @param  {string} string : 正規表現に変換したい文字列。 "/.+/g"のような形式
 * @return {RegExp} : 正規表現オブジェクト
 */
function stringToRegex(string) {
  const kCheckRegex1 = /\/(.*)\/(.*)/; //use this forconvert string to Regex
  const kCheckRegex2 = /^[gimy]{0,4}$/; //for check regular expression. whether flags are valid or not
  const kCheckRegex3 = /(.).*?\1/; //for check regular expression. whether flags are duplicate or not
  let match = kCheckRegex1.exec(string);

  if (match !== null &&
    match[1] !== "" &&
    kCheckRegex2.test(match[2]) && //flag checking
    !kCheckRegex3.test(match[2]) //duplicate
  ) {
    return new RegExp(match[1], match[2]);
  }
  return null;
}

/**
 * 負の数の場合か、長さが足りない場合には空文字列を返すsubstr
 * @param  {string} str : 元の文字列
 * @param  {integer} pos : 開始位置
 * @param  {integer} len : 長さ
 * @return {string} : 文字列
 */
function getSubStr(str, pos, len) {
  if (pos < 0 || pos + len > str.length) {
    return "";
  }
  return str.substr(pos, len);
}

/**
 * 指定した文字列で文字列を囲む
 * @param  {string} string : 囲みたい文字列
 * @param  {String} [openString="""] : 開始
 * @param  {String} [closeString="""] : 終了
 * @return {string} : 囲まれた文字列
 */
function enclose(string, openString = "\"", closeString = "\"") {
  return openString + string + closeString;
}

/**
 * 条件が真のならばsecondを返し、偽ならばfirstを返す
 * @param  {boolean} condition : 真偽値
 * @param  {any} first : 任意の値
 * @param  {any} second : 任意の値
 * @return {any} :
 */
function returnSecondIfTrue(condition, first, second) {
  if (condition) {
    return second;
  }
  return first;
}

/**
 * 条件が真ならば、funcを実行する
 * @param  {boolean} condition : 真偽値
 * @param  {function} func : 実行したい関数
 * @param  {...any} args : 関数に渡す可変長引数
 * @return {any} : 関数の戻り値。 実行されなかった場合はnull
 */
function executeIfTrue(condition, func, ...args) {
  if (condition) {
    return func(...args);
  }
  return null;
}

/**
 * 与えられた文字列が空文字ならば、secondを返す
 * @param  {string} first : 文字列
 * @param  {string} second : firstが空文字列ならば返される文字列
 * @return {string} : first か second
 */
function returnSecondIfEmptyString(first, second) {
  return returnSecondIfTrue(isEmptyString(first), first, second);
}

/**
 * 数値を整形された文字列に変換する
 * @param  {integer} num : 変換したい数値
 * @param  {integer} radix : 変換後の基数
 * @param  {integer} digits : 変換後の桁数。 0ならば桁数を変更しない
 * @param  {boolean} upperCase : アルファベットを大文字にするか否か。trueで大文字にする
 * @param  {string} paddingChar : 桁数を変更する場合に埋め合わせる文字(列)
 * @param  {string} sign : "minus", "plus", "space" 記号の表示方法を指定する。
 * @param  {string} align : "left", "right", "right_lead_sign" 文字揃えを指定する。
 * @return {string} : 整形された文字列
 */
function toPaddedString(num, radix, digits, upperCase, paddingChar, sign, align) {
  let str = num.toString(radix);
  if (upperCase) {
    str = str.toUpperCase();
  }
  if (digits === 0) {
    return str;
  }

  if (sign === "plus" && num >= 0) {
    str = `+${str}`;
  } else if (sign === "space" && num >= 0) {
    str = ` ${str}`;
  }

  let len = str.length;
  let result = "";
  while ((digits - len++) > 0) {
    result += paddingChar;
  }

  if (align === "left") {
    result = str + result;
  } else {
    result += str;
  }

  if (align === "right_lead_sign") {
    result = result.replace(/.(.*)([-+ ])(.+)/i, `$2$1${paddingChar}$3`);
  }

  return result;
}

/**
 * index の位置から前または後ろにcharがいくつあるか数える。
 * string = "aabbccddee" , index = 3, char = "c", direction = 1, return = 2
 * string = "aabbccddee" , index = 6, char = "c", direction = -1, return = 2
 * @param  {string} string 検索対象の文字列
 * @param  {integer} index 検索位置
 * @param  {string} char : 検索する1文字
 * @param  {integer} direction : 検索方向。 1: 通常、 -1: 逆
 * @return {integer} : 文字数
 */
function countSequentialChar(string, index, char, direction = 1) {
  if (index >= string.length) {
    return 0;
  }

  let start = index + 1;
  let end = string.length - 1;
  if (direction === -1) {
    start = index - 1;
    end = 0;
  }

  let count = 0;
  for (let i = start; i * direction <= end * direction; i += direction) {
    if (string[i] !== char) {
      break;
    }
    ++count;
  }
  return count;
}

/**
 * 文字列をkNumberRegexにマッチする数値とそれ以外の文字列に分割する。16進数や2進数はどうするか?
 * @param  {string} string : 分割したい文字列
 * @return {Array.<string>} : 配列に分割された文字列
 */
function separateAlphabetNumber(string) {
  let result = [string];
  let numbers = getAllMatches(kNumberRegexG, string);
  if (numbers.length !== 0) {
    result = [];
    pushNotEmptyString(result, string.substring(0, numbers[0][2]));
    for (let i = 0; i < numbers.length - 1; ++i) {
      result.push(numbers[i][0]); //1230と123を区別するためにこの時点では数値にしない
      pushNotEmptyString(result, string.substring(numbers[i][3], numbers[i + 1][2]));
    }
    result.push(numbers[numbers.length - 1][0]);
    pushNotEmptyString(result, string.substring(numbers[numbers.length - 1][3]));
  }
  return result;
}

/**
 * 指定した文字列に囲まれた文字列を得る
 * @param  {string}  string : 操作対象の文字列
 * @param  {String}  [openString] : 開始文字列
 * @param  {String}  [closeString] : 終了文字列
 * @param  {Boolean} [include=true] : 結果に囲み文字を含めるかどうか
 * @return {string} : 囲まれた文字列
 */
function getEnclosedStringDifferent(string, openString, closeString, include = true) {
  if (isEmptyString(string) || isEmptyString(openString) || isEmptyString(closeString)) {
    return [];
  }

  let result = [];
  let openPositions = [];
  let closePositions = [];

  for (let i = 0; i < string.length; ++i) {
    if (isSameSubString(string, openString, i) && !isEscapedChar(string, i)) {
      openPositions.push(i);
    } else if (isSameSubString(string, closeString, i) && !isEscapedChar(string, i)) {
      closePositions.push(i);
    }
  }
  //debugger
  let start = -1;
  let end = -1;
  while (closePositions.length !== 0) {
    end = closePositions.shift();
    for (let i = openPositions.length - 1; i >= 0; --i) {
      if (end > openPositions[i]) {
        start = spliceArray(openPositions, i);
        break;
      }
    }

    if (isUndefined(start) || start === -1 || isUndefined(end)) {
      return result;
    }

    if (include) {
      result.push(string.substring(start, end + closeString.length));
    } else {
      result.push(string.substring(start + openString.length, end));
    }
    start = -1;
  }

  return result;
}

/**
 * 指定した文字列に囲まれた文字列を得る
 * @param  {string}  string : 操作対象の文字列
 * @param  {String}  [encloseString] : 囲み文字列
 * @param  {Boolean} [include=true] : 結果に囲み文字を含めるかどうか
 * @return {string} : 囲まれた文字列
 */
function getEnclosedStringSame(string, encloseString, include = true) {
  if (isEmptyString(string) || isEmptyString(encloseString)) {
    return [];
  }

  let result = [];
  let positions = [];

  for (let i = 0; i < string.length; ++i) {
    if (isSameSubString(string, encloseString, i) && !isEscapedChar(string, i)) {
      positions.push(i);
    }
  }

  let start = 0;
  let end = 0;

  while (positions.length !== 0) {
    start = positions.shift();
    end = positions.shift();

    if (isUndefined(start) || isUndefined(end)) {
      return result;
    }

    if (include) {
      result.push(string.substring(start, end + encloseString.length));
    } else {
      result.push(string.substring(start + encloseString.length, end));
    }
  }

  return result;
}

/**
 * 指定した文字列に囲まれた文字列を得る
 * @param  {string}  string : 操作対象の文字列
 * @param  {String}  openString : 開始文字列
 * @param  {String}  closeString : 終了文字列
 * @param  {Boolean} [include=true] : 結果に囲み文字を含めるかどうか
 * @return {string} : 囲まれた文字列
 */
function getEnclosedString(string, openString, closeString, include = true) {
  if (openString === closeString) {
    return getEnclosedStringSame(string, openString, include);
  }
  return getEnclosedStringDifferent(string, openString, closeString, include);
}

/**
 * separatorで文字列を分割する。 ただしエスケープされたseparatorは分割しない
 * @param  {string} string  : 分割対象の文字列
 * @param  {string} [separator=","] : 区切り文字 1文字
 * @return {Array.<string>} : 分割された文字列が格納された配列
 */
function splitString(string, separator = ",") {
  let result = [];
  let last = 0;
  for (let i = 0; i < string.length; ++i) {
    if (string[i] === separator && !isEscapedChar(string, i)) {
      result.push(string.substring(last, i));
      last = ++i;
    }
  }
  result.push(string.substring(last, string.length));
  return result;
}

/**
 * separatorで文字列を分割する。分割された配列にseparatorが含まれる
 * @param  {string} string  : 分割対象の文字列
 * @param  {string} [separator=""] : 区切り文字 1文字
 * @return {Array.<string>} : 分割された文字列が格納された配列
 */
function splitStringWithSeparator(string, separator = "") {
  let result = string.split(separator);
  for (let i = 0; i < result.length - 1; i++) {
    result[i] += separator;
  }
  return result;
}

/**
 * 文字列に含まれるすべてのエスケープされた文字を、エスケープされていない文字に変換する。 単独のバックスラッシュを削除する
 * @param  {string} string : 操作対象の文字列
 * @return {string} : エスケープが解除された文字列
 */
function removeEscape(string) {
  let result = "";
  for (let i = 0; i < string.length; ++i) {
    if (string[i] === "\\") {
      ++i;
    }
    result += string[i];
  }
  return result;
}

/**
 * 文字列に含まれる "\^$*+?.()|{}[]" をエスケープする
 * @param  {string} string : エスケープしたい文字列
 * @return {string} : エスケープされた文字列
 */
function escapeSpecialCharacters(string) {
  const kSpecialCharacters = /([\\^$*+?.()|{}[\]])/g;
  return string.replace(kSpecialCharacters, "\\$1");
}

// stringToArray Array.from(string)
/**
 * カンマで区切られた数値の文字列を配列に分割する
 * @param  {string} string : 分割対象の文字列。 "1,23,4,5,66,7"のようなもの
 * @param  {String} [separator=""] : 区切り文字
 * @param  {any} [setNaN=null] : NaNになった場合に置き換えるもの
 * @return {Array} : 数値の配列
 */
function stringToNumberArray(string, separator = "", setNaN = null) {
  if (isEmptyString(string)) {
    return [];
  }

  let array = string.split(separator);
  for (let i = 0; i < array.length; ++i) {
    array[i] = parseInt(array[i].trim(), 10);
    if (isNaN(array[i]) && setNaN !== null) {
      array[i] = setNaN;
    }
  }
  return array;
}

////////
//文字列 終了
////////

////////
//判定 開始
////////

/**
 * 文字列を大文字小文字を区別するしないどちらかで比較する。
 * ただし、区別しないで比較した結果、同じと判定されたら区別してもう一度比較する。
 * @param  {string}  xString : 比較文字列
 * @param  {string}  yString : 比較文字列
 * @param  {Boolean} [insensitive=false] : 大文字小文字を区別するか否か trueで区別しない
 * @return {integer} : 比較結果 -1: x < y, 0: x === y, 1: x > y
 */
function caseSensitiveCompare(xString, yString, insensitive = false) {
  let x = xString;
  let y = yString;
  if (insensitive) {
    if (typeof xString === "string") {
      x = xString.toLowerCase();
    }
    if (typeof yString === "string") {
      y = yString.toLowerCase();
    }
  }

  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  if (!insensitive) {
    return 0;
  }
  return caseSensitiveCompare(xString, yString, false);
}

/**
 * natural sort順で文字列を比較する
 * @param  {string}  xString : 比較文字列
 * @param  {string}  yString : 比較文字列
 * @param  {Boolean} [insensitive=false] : 大文字小文字を区別か否か。 trueで区別しない
 * @return {integer} : 比較結果 -1: x < y, 0: x === y, 1: x > y
 */
function naturalSortCompare(xString, yString, insensitive = false) {
  let xArray = separateAlphabetNumber(xString);
  let yArray = separateAlphabetNumber(yString);
  let count = xArray.length < yArray.length ? xArray.length : yArray.length;

  for (let i = 0; i < count; ++i) {
    let x = xArray[i];
    let y = yArray[i];

    if (kNumberRegex.test(xArray[i])) {
      x = stringToNumber(xArray[i]);
    }
    if (kNumberRegex.test(yArray[i])) {
      y = stringToNumber(yArray[i]);
    }
    let result = caseSensitiveCompare(x, y, insensitive);
    if (result !== 0) {
      return result;
    }
    //末尾が0の場合の判定. 1.20, 1.2
    if (x === y &&
      typeof x === "number" &&
      typeof y === "number"
    ) {
      result = caseSensitiveCompare(x, y, insensitive);
      if (result !== 0) {
        return result;
      }
    }
  }
  return caseSensitiveCompare(xArray.length, yArray.length, true);
}

////////
//判定 終了
////////

////////
//配列 開始
////////

/**
 * 空文字列でないならば、配列に追加する
 * @param  {Array} array [description]
 * @param  {string} data  [description]
 * @return {none} : なし
 */
function pushNotEmptyString(array, data) {
  let func = Array.prototype.push.bind(array);
  executeIfTrue(!isEmptyString(data), func, data);
}

/**
 * 配列の反転されたコピーを返す
 * @param  {Array} array :
 * @return {Array} : 反転されたコピー
 */
function shallowCopyReversedArray(array) {
  return array.slice().reverse();
}

/**
 * 配列から指定した要素を削除してそれを返す
 * @param  {Array} array : 捜査対象
 * @param  {integer} index : 削除したい位置
 * @return {any} : 削除された値
 */
function spliceArray(array, index) {
  return array.splice(index, 1)[0];
}

/**
 * 配列フィルタ。 重複を取り除く
 * @param  {any} e : 配列のi番目の要素
 * @param  {integer} i : インデックス
 * @param  {array} arr : 操作対象の配列
 * @return {boolean} : true ならば取り除かれない
 */
function uniqueFilter(e, i, arr) {
  return arr.indexOf(e) === i;
}

/**
 * 重複が取り除かれた配列を返す
 * @param  {array} array : 操作対象の配列
 * @return {array} : 重複が取り除かれた配列
 */
function uniqueArray(array) {
  return array.filter(uniqueFilter);
}

/**
 * 指定した値を含まない配列を返す
 * @param  {array} array : 操作対象の配列
 * @param  {array} data : フィルタしたい値
 * @return {array} : フィルタされた配列
 */
function filterArrayData(array, data) {
  return array.filter((x, _i, _arr) => {
    for (let element of data) {
      if (x === element) {
        return false;
      }
    }
    return true;
  });
}

/**
 * 数値の配列から、指定した範囲に入っていないものを取り除く
 * @param  {Array.<number>} array : 数値の配列
 * @param  {number} [min=null] : 最小値。 任意
 * @param  {number} [max=null] : 最大値。 任意
 * @return {Array.<number>} : フィルタされた配列
 */
function filterArrayRange(array, min = null, max = null) {
  return array.filter((x, _i, _arr) => {
    if (min !== null && x >= min &&
      max !== null && x <= max) {
      return true;
    }
    if (max === null && min && x >= min) {
      return true;
    }
    if (min === null && max && x <= max) {
      return true;
    }
    if (min === null && max === null) {
      return true;
    }
    return false;
  });
}

////////
//配列 終了
////////

////////
//RegExp
////////

/**
 * 全てのマッチの[マッチした文字列、開始位置、終了位置]を返す。
 * @param  {RegExp} reg : 検索正規表現 g flagが必須
 * @param  {string} string : 検索対象の文字列
 * @return {Array} : [マッチした文字列, 長さ, 開始位置, 終了位置]。 見つからない場合は[]
 */
function getAllMatches(reg, string) {
  if (reg.global === false) {
    return [];
  }

  let result = [];
  let match = {};

  match = reg.exec(string);
  while (match !== null) {
    result.push([match[0], reg.lastIndex - match.index, match.index, reg.lastIndex]);
    if (reg.lastIndex - match.index === 0) {
      reg.lastIndex += 1;
    }
    match = reg.exec(string);
  }
  return result;
}

/**
 * Capturing Groupに変換される"()"の数を数える。 エスケープされていない"()"の数
 * @param  {string} string : 正規表現に変換したい文字列
 * @return {integer} : Capturing Groupの数
 */
function countCapturingGroup(string) {
  let count = 0;
  let openParenthesis = 0;
  for (let i = 0; i < string.length; ++i) {
    if (string[i] === "(" &&
      i + 1 < string.length && string[i + 1] !== "?" &&
      countSequentialChar(string, i, "\\", -1) % 2 === 0) {
      ++openParenthesis;
    } else if (openParenthesis > 0 && string[i] === ")" &&
      countSequentialChar(string, i, "\\", -1) % 2 === 0) {
      --openParenthesis;
      ++count;
    }
  }
  return count;
}

////////
//debug
////////

/**
 * 引数をconsole.logで一行ずつ表示する
 * @param  {...any} args : 表示したい引数。 可変長
 * @return {none} : なし
 */
function logLine(...args) {
  for (let data of args) {
    console.log(data);
  }
}

/**
 * プロパティ名とプロパティの値を表示する
 * @param  {Object} obj : 表示したいプロパティを持っているオブジェクト
 * @param  {string} property : プロパティ名
 * @return {none} : なし
 */
function logProperty(obj, property) {
  console.log(property, obj[property]);
}

/**
 * RegExpのプロパティを表示する
 * @param  {RegExp} reg : 表示したいRegExpオブジェクト
 * @return {none} : なし
 */
function logRegex(reg) {
  logProperty(reg, "source");
  logProperty(reg, "lastIndex");
  logProperty(reg, "ignoreCase");
  logProperty(reg, "multiline");
}

//////
export {
  kNumberRegex,
  kNumberRegexG,
};

export {
  isEmpty,
  isEmptyObject,
  isEmptyString,
  checkInteger,
  isEqualObj,
  isEscapedChar,
  isSameSubString,
  isUndefined,

  caseSensitiveCompare,
  naturalSortCompare,


  getOnlySecond,
  binarySearch,
  shallowCopy,
  deepCopy,
  returnSecondIfTrue,
  executeIfTrue,
  shallowCopyTargetProperty,
  toArrayBuffer,
  toBuffer,

  stringToBoolean,
  stringToNumber,
  stringToRegex,
  unicodeEscapeSequenceReplacer,
  unicodeEscapeSequenceToChar,
  getSubStr,
  returnSecondIfEmptyString,
  toPaddedString,
  countSequentialChar,
  enclose,
  separateAlphabetNumber,
  getEnclosedStringDifferent,
  getEnclosedStringSame,
  getEnclosedString,
  splitString,
  splitStringWithSeparator,
  removeEscape,
  escapeSpecialCharacters,
  stringToNumberArray,

  pushNotEmptyString,
  shallowCopyReversedArray,
  spliceArray,
  uniqueFilter,
  uniqueArray,
  filterArrayData,
  filterArrayRange,

  logLine,
  logProperty,
  logRegex,

  getAllMatches,
  countCapturingGroup,

};

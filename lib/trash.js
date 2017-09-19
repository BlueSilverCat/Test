"use babel";

import {
  returnSecondIfTrue,
} from "./utility";

/**
 * secondに含まれる要素にだけfuncを適用する
 * @param  {array} first : 配列
 * @param  {array} second : 配列
 * @param  {function} func : 関数
 * @param  {object} [what=this] : 関数を実行するthis
 * @return {array} : firstを返す
 */
function doOnlySecond(first, second, func, what = null) {
  const kErr = -1;

  for (let data of second) {
    if (first.indexOf(data) !== kErr) {
      func.call(what, data);
    }
  }
  return first;
}

/**
 * targetStrの部分文字列とsearchStrを比較する. searchStrが空文字列の場合は比較しないでfalseを返す
 * @param  {[type]} targetStr [description]
 * @param  {[type]} pos       [description]
 * @param  {[type]} searchStr [description]
 * @return {[type]}           [description]
 */
function checkSubStr(targetStr, pos, searchStr) {
  if (searchStr === "" || pos < 0 || pos + searchStr.length > targetStr.length) {
    return false;
  }
  return targetStr.substr(pos, searchStr.length) === searchStr;
}

//targetStrの中にあるsearchStrをreplaceStrに置き換える
//前にnPrevと、後ろにnNextがない場合に限る
//nPrevとnNextが空文字列の場合は、判定に使われない
function replace(targetStr, searchStr, replaceStr, nPrev, nNext) {
  let result = targetStr;
  for (let i = 0; i < result.length; ++i) {
    if (result.substr(i, searchStr.length) === searchStr &&
      checkSubStr(result, i - nPrev.length, nPrev) === false &&
      checkSubStr(result, i + searchStr.length, nNext) === false) {
      result = result.slice(0, i) + replaceStr + result.slice(i + searchStr.length);
    }
  }
  return result;
}

/**
 * 対象のオブジェクトのプロパティを変更する関数を返す
 * @param {object} target : プロパティを変更したいオブジェクト
 * @param {string} property : プロパティ名
 * @return {funciton} 対象のプロパティを変更する関数
 */
function setTargetProperty(target, property) {
  return (val) => {
    target[property] = val;
  };
}

/**
 * firstがundefinedならばsecondを、そうでないならばfirstを返す
 * @param  {any} first : undefinedかどうか検査する変数
 * @param  {any} second : undefinedの場合返す変数
 * @return {any} : first or second
 */
function returnSecondIfUndefined(first, second) {
  return returnSecondIfTrue(typeof first === "undefined", first, second);
}

/**
 * オブジェクトの配列から、指定したプロパティの値の配列を返す
 * @param  {Array.<Object>} arrayObj : オブジェクトの配列
 * @param  {string} property : 取り出したいプロパティ
 * @return {Array} : プロパティの値の配列
 */
function getPropertyArrayFromObjArray(arrayObj, property) {
  let result = [];

  for (let i = 0; i < arrayObj.length; ++i) {
    result.push(arrayObj[i][property]);
  }
  return result;
}

/**
 * 指定されたインデックスからfuncがtrueになる値を検索する。 要らない?
 * @param  {Array} array : 検索したい配列
 * @param  {integer} current : 検索開始位置
 * @param  {integer} direction : 方向。 1=通常, -1=逆
 * @param  {function} func : booleanを返す判定関数。 trueを返さば見つかったことになる
 * @return {integer} : 見つかった位置。 見つからなかった場合は, -1
 */
function circulationSearch(array, current, direction, func) {
  let start = 0;
  let end = array.length - 1;
  if (direction === -1) {
    start = array.length - 1;
    end = 0;
  }

  for (let i = current; i * direction <= end * direction; i += direction) {
    if (func(array[i])) {
      return i;
    }
  }
  for (let i = start; i * direction < current * direction; i += direction) {
    if (func(array[i])) {
      return i;
    }
  }

  return -1;
}

/* Node path.extname
function getExtension(path) {
  if (/\./.test(path)) {
    return path.split(".").pop();
  }
  return "";
}

function setDefault(obj, property, value) {
  if(!obj.hasOwnProperty(property)) {
    option[property] = value;
  }
}

//regex.textで良いのではないか? matchした結果から文字列の事もある
function isMatchValidString(execResult) {
  if (execResult && execResult[0] !== "") {
    return true;
  }
  return false;
}
*/

export {
  doOnlySecond,
  checkSubStr,
  replace,
  setTargetProperty,
  returnSecondIfUndefined,
  getPropertyArrayFromObjArray,
  circulationSearch,
};

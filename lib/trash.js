"use babel";

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

export {
  doOnlySecond,
};

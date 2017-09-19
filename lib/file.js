"use babel";

import fs from "fs";
import { isEmptyString } from "./utility";

/*
function fileClose(fd) {
  return new Promise((resolve, reject) => {
    fs.close(fd, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
*/

/**
 * ファイルを読み込む(全部)
 * @param  {string} path : ファイルのパス
 * @return {Promise} : ファイルの内容を返すプロミス
 */
function read(path) {
  let promise = new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
  return promise;
}

/**
 * ファイルにdataを書き込む
 * @param  {string} path : ファイルパス
 * @param  {string} data : 書き込む文字列
 * @return {Promise} : resolveで何も返さない
 */
function write(path, data) {
  let promise = new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
  return promise;
}

/**
 * ファイルが存在するか検査する
 * @param  {string}  path : 調べたいパス
 * @return {Boolean} : 存在する: true
 */
function existsFile(path) {
  return new Promise((resolve, reject) => {
    fs.open(path, "r", (err, fd) => {
      if (!err) {
        fs.closeSync(fd);
        resolve(true);
        return;
      }
      if (err.code === "ENOENT") {
        resolve(false);
        return;
      }
      reject(err);
    });
  });
}

/**
 * ディレクトリを作成する
 * @param  {string} path : 作成したいパス
 * @return {Promise} : resolve: 何も返さない, reject: Error
 */
function mkDir(path) {
  return new Promise((resolve, reject) => {
    fs.open(path, "r", (err, fd) => {
      if (!err) {
        fs.closeSync(fd);
        let stats = fs.statSync(path);
        if (stats.isDirectory()) {
          resolve();
          return;
        }
        reject(new Error("path exist"));
        return;
      }

      if (err.code === "ENOENT") {
        fs.mkdirSync(path);
        resolve();
        return;
      }
      reject(err);
    });
  });
}

/**
 * ディレクトリを削除する
 * @param  {string} path : 削除したいパス
 * @return {Promise} : resolve: 何も返さない, reject: Error
 */
function rmDir(path) {
  return new Promise((resolve, reject) => {
    fs.open(path, "r", (err, fd) => {
      if (!err) {
        fs.closeSync(fd);
        let stats = fs.statSync(path);
        if (stats.isDirectory()) {
          fs.rmdirSync(path);
          resolve();
          return;
        }
        reject(new Error("path is not directory"));
        return;
      }

      if (err.code === "ENOENT") {
        resolve();
        return;
      }
      reject(err);
    });
  });
}

export {
  //fileClose,
  read,
  write,
  existsFile,
  mkDir,
  rmDir,
};

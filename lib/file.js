"use babel";

import fs from "fs";
import { isEmpty } from "./utility";

//ファイルを読み込む(全部)
function read(path) {
  if (isEmpty(path) === true) {
    return Promise.reject(new Error("path is null"));
  }

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

//ファイルに書き込む(全部)
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

//ファイルが存在するか検査する
function isFileExist(path) {
  return new Promise((resolve, reject) => {
    fs.open(path, "r", (err, _fd) => {
      if (!err) {
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

//ディレクトリを作成する(同期)
function mkDir(path) {
  return new Promise((resolve, reject) => {
    fs.open(path, "r", (err, fd) => {
      if (!err) {
        resolve(fd);
        return;
      }

      if (err.code === "ENOENT") {
        fs.mkdirSync(path);
        resolve(fd);
        return;
      }
      reject(err);
    });
  });
}

export {
  read,
  write,
  isFileExist,
  mkDir,
};

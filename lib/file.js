"use babel";

import fs from "fs";
import { isEmpty } from "./utility";

export function read(path) {
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

export function write(path, data) {
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

"use babel";

import fs from "fs";
import path from "path";
import * as file from "../lib/file";

//jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("file", () => {
  describe("mkDir", () => {
    let targetPath = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    afterEach(() => {
      if (fs.existsSync(targetPath)) {
        if (fs.statSync(targetPath).isDirectory()) {
          fs.rmdirSync(targetPath);
        } else {
          fs.unlinkSync(targetPath);
        }
      }
    });

    it("test 1", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      result = file.mkDir(targetPath);
      result.then(() => {
        expect(fs.existsSync(targetPath)).toBe(true);
        expect(fs.statSync(targetPath).isDirectory()).toBe(true);
        done();
      }).catch((err) => {
        throw err;
      });
    });

    it("test 2", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.mkdirSync(targetPath);
      expect(fs.existsSync(targetPath)).toBe(true);
      expect(fs.statSync(targetPath).isDirectory()).toBe(true);

      result = file.mkDir(targetPath);
      result.then(() => {
        expect(fs.existsSync(targetPath)).toBe(true);
        expect(fs.statSync(targetPath).isDirectory()).toBe(true);
        done();
      }).catch((err) => {
        throw err;
      });
    });

    it("test 3", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.writeFileSync(targetPath, "");
      expect(fs.existsSync(targetPath)).toBe(true);
      expect(fs.statSync(targetPath).isFile()).toBe(true);
      result = file.mkDir(targetPath);
      result.then(() => {
        throw new Error("unknown error");
      }).catch((err) => {
        expect(err).toEqual(new Error("path exist"));
        done();
      });
    });
  });

  describe("rmDir", () => {
    let targetPath = "";
    let result = null;

    beforeEach(() => {
      result = null;
      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.mkdirSync(targetPath);
      expect(fs.existsSync(targetPath)).toBe(true);
      expect(fs.statSync(targetPath).isDirectory()).toBe(true);
    });

    afterEach(() => {
      if (fs.existsSync(targetPath)) {
        if (fs.statSync(targetPath).isDirectory()) {
          fs.rmdirSync(targetPath);
        } else {
          fs.unlinkSync(targetPath);
        }
      }
    });

    it("test 1", (done) => {
      result = file.rmDir(targetPath);
      result.then(() => {
        expect(fs.existsSync(targetPath)).toBe(false);
        done();
      }).catch((err) => {
        throw err;
      });
    });

    it("test 2", (done) => {
      fs.rmdirSync(targetPath);
      expect(fs.existsSync(targetPath)).toBe(false);

      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.writeFileSync(targetPath, "");

      result = file.rmDir(targetPath);
      result.then(() => {
        throw new Error("unknown error");
      }).catch((err) => {
        expect(err).toEqual(new Error("path is not directory"));
        expect(fs.existsSync(targetPath)).toBe(true);
        expect(fs.statSync(targetPath).isFile()).toBe(true);
        done();
      });
    });

    it("test 3", (done) => {
      fs.rmdirSync(targetPath);
      expect(fs.existsSync(targetPath)).toBe(false);

      result = file.rmDir(targetPath);
      result.then(() => {
        expect(fs.existsSync(targetPath)).toBe(false);
        done();
      }).catch((err) => {
        throw err;
      });
    });
  });

  describe("read", () => {
    let targetPath = "";
    let result = null;

    beforeEach(() => {
      result = null;
      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.writeFileSync(targetPath, "0123456789");
      expect(fs.existsSync(targetPath)).toBe(true);
      expect(fs.statSync(targetPath).isFile()).toBe(true);
    });

    afterEach(() => {
      if (fs.existsSync(targetPath)) {
        if (fs.statSync(targetPath).isDirectory()) {
          fs.rmdirSync(targetPath);
        } else {
          fs.unlinkSync(targetPath);
        }
      }
    });

    it("test 1", (done) => {
      result = file.read(targetPath);
      result.then((data) => {
        expect(data).toBe("0123456789");
        done();
      }).catch((err) => {
        throw err;
      });
    });

    it("test 2", (done) => {
      result = file.read("");
      result.then((_data) => {
        throw new Error("unknown error");
      }).catch((err) => {
        //console.log(err);
        expect(err instanceof Error).toBe(true);
        done();
      });
    });

    it("test 3", (done) => {
      result = file.read(path.join(path.dirname(__filename), "_temp1231_"));
      result.then((_data) => {
        throw new Error("unknown error");
      }).catch((err) => {
        //console.log(err);
        expect(err instanceof Error).toBe(true);
        done();
      });
    });
  });

  describe("write", () => {
    let targetPath = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    afterEach(() => {
      if (fs.existsSync(targetPath)) {
        if (fs.statSync(targetPath).isDirectory()) {
          fs.rmdirSync(targetPath);
        } else {
          fs.unlinkSync(targetPath);
        }
      }
    });

    it("test 1", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      result = file.write(targetPath, "0123456789");
      result.then(() => {
        expect(fs.existsSync(targetPath)).toBe(true);
        expect(fs.statSync(targetPath).isFile()).toBe(true);
        expect(fs.readFileSync(targetPath, "utf8")).toBe("0123456789");
        done();
      }).catch((err) => {
        throw err;
      });
    });

    it("test 2", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.writeFileSync(targetPath, "abcdefghij");
      expect(fs.existsSync(targetPath)).toBe(true);
      expect(fs.statSync(targetPath).isFile()).toBe(true);
      result = file.write(targetPath, "0123456789");
      result.then(() => {
        expect(fs.existsSync(targetPath)).toBe(true);
        expect(fs.statSync(targetPath).isFile()).toBe(true);
        expect(fs.readFileSync(targetPath, "utf8")).toBe("0123456789");
        done();
      }).catch((err) => {
        throw err;
      });
    });

    it("test 3", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.mkdirSync(targetPath);
      expect(fs.existsSync(targetPath)).toBe(true);
      expect(fs.statSync(targetPath).isDirectory()).toBe(true);
      result = file.write(targetPath, "0123456789");
      result.then(() => {
        throw new Error("unknown error");
      }).catch((err) => {
        //console.log(err);
        expect(fs.existsSync(targetPath)).toBe(true);
        expect(fs.statSync(targetPath).isDirectory()).toBe(true);
        expect(err instanceof Error).toBe(true);
        done();
      });
    });

    it("test 3", (done) => {
      targetPath = "";
      result = file.write(targetPath, "0123456789");
      result.then(() => {
        throw new Error("unknown error");
      }).catch((err) => {
        //console.log(err);
        expect(fs.existsSync(targetPath)).toBe(false);
        expect(err instanceof Error).toBe(true);
        done();
      });
    });
  });

  describe("existsFile", () => {
    let targetPath = "";
    let result = null;

    beforeEach(() => {
      result = null;
    });

    afterEach(() => {
      if (fs.existsSync(targetPath)) {
        if (fs.statSync(targetPath).isDirectory()) {
          fs.rmdirSync(targetPath);
        } else {
          fs.unlinkSync(targetPath);
        }
      }
    });

    it("test 1", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      result = file.existsFile(targetPath);
      result.then((data) => {
        expect(fs.existsSync(targetPath)).toBe(false);
        expect(data).toBe(false);
        done();
      }).catch((err) => {
        throw err;
      });
    });

    it("test 2", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.writeFileSync(targetPath, "012");
      expect(fs.existsSync(targetPath)).toBe(true);
      expect(fs.statSync(targetPath).isFile()).toBe(true);
      result = file.existsFile(targetPath);
      result.then((data) => {
        expect(fs.existsSync(targetPath)).toBe(true);
        expect(data).toBe(true);
        done();
      }).catch((err) => {
        throw err;
      });
    });

    it("test 3", (done) => {
      targetPath = path.join(path.dirname(__filename), "_temp_");
      fs.mkdirSync(targetPath);
      expect(fs.existsSync(targetPath)).toBe(true);
      expect(fs.statSync(targetPath).isDirectory()).toBe(true);
      result = file.existsFile(targetPath);
      result.then((data) => {
        expect(fs.existsSync(targetPath)).toBe(true);
        expect(data).toBe(true);
        done();
      }).catch((err) => {
        throw err;
      });
    });
  });
});

const path = require("path");
const fs = require("fs");
const astTransform = require("./ast");
const config = require("../common/common.json");
const folder = path.resolve(config.folder);
const target = path.resolve(config.target);

const jsFileReg = /\.js$/g;

let fileCount = 0;
let fileDoneLength = 0;
let targetLength = 0;

main();

function main() {
  console.time("main");
  fileDisplay(folder);
}

function fileDisplay(filePath) {
  let dirlist = fs.readdirSync(filePath);
  for (let i = 0; i < dirlist.length; i++) {
    let filename = dirlist[i];
    let filedir = path.join(filePath, filename);
    if (filename !== "node_modules") {
      const fileStats = fs.statSync(filedir);
      if (fileStats.isDirectory()) {
        fileDisplay(filedir);
      } else if (fileStats.isFile()) {
        analysisFile(filedir);
      }
    }
  }
}

function analysisFile(fileName) {
  if (jsFileReg.test(fileName)) {
    targetLength++;
    fs.readFile(path.resolve(folder, fileName), "utf8", (err, data) => {
      if (err) return console.log(err);
      // 执行转换
      writeFile(astTransform(data)); // ast转换
      // writeFile(data);// 文件io
    });
  }
}

// 生成文件
function writeFile(result) {
  fileCount++;
  let cusPath = `${target}/${fileCount}-node.js`;
  fs.writeFile(cusPath, result, "utf8", (err) => {
    if (err) console.log(err);
    fileDoneLength++;
    if (targetLength === fileDoneLength) {
      console.timeEnd("main");
      console.log("done!");
    }
  });
}

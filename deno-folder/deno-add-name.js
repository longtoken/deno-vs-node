import astTransform from "./ast.js";
const config = JSON.parse(Deno.readTextFileSync("../common/common.json"));
const folder = Deno.realPathSync(config.folder);
const target = Deno.realPathSync(config.target);

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
  for (const dirEntry of Deno.readDirSync(filePath)) {
    let filedir = `${filePath}/${dirEntry.name}`;

    if (dirEntry.name !== "node_modules" && dirEntry.name !== "src") {
      const fileInfo = Deno.statSync(filedir);
      if (fileInfo.isDirectory) {
        fileDisplay(filedir);
      } else if (fileInfo.isFile) {
        analysisFile(filedir);
      }
    }
  }
}

function analysisFile(fileName) {
  if (jsFileReg.test(fileName)) {
		targetLength++;
    Deno.readTextFile(fileName).then((value) => {
      // 执行转换
      writeFile(astTransform(value)); // ast转换加文件io
      // writeFile(value); // 文件io
    });
  }
}

// 生成文件
function writeFile(result) {
  fileCount++;
  let cusPath = `${target}/${fileCount}-deno.js`;
  Deno.writeTextFile(cusPath, result).then(() => {
		fileDoneLength++;
    if (targetLength === fileDoneLength) {
      console.timeEnd("main");
      console.log("done!");
    }
  });
}

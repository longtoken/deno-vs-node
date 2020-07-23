const fs = require("fs");
const config = require("../common/common.json");

// sort
const dataArray = require("../common/node-data-array").dataArray;
console.time("sort-array");
dataArray.sort((a, b) => {
  return a - b;
});
console.timeEnd("sort-array");
console.log("");

// md5
const SparkMD5 = require("./node-spark-md5");
let spark = new SparkMD5.ArrayBuffer();
fs.readFile(config.md5Path, (err, data) => {
  if (err) return console.log(err);
  console.time("md5");
  spark.append(data);
  console.log(`md5: ${spark.end()}`);
  console.timeEnd("md5");
  console.log("");
});

// base64
const Base64 = require("./node-base64").Base64;
fs.readFile(config.md5Path, (err, data) => {
  if (err) return console.log(err);
  console.time("Base64");
  Base64.encode(data);
  console.timeEnd("Base64");
  console.log("");
});

// fib
function fib(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}
console.time("fib");
fib(40);
console.timeEnd("fib");
console.log("");

//for in
const dataObject = require("../common/node-data-object").dataObject;
let total = 0;
console.time("for in");
for (let k in dataObject) {
  total += dataObject[k].list[0].n;
}
console.timeEnd("for in");
console.log(`for in: ${total}`);
console.log("");

// JSON.stringify
console.time("JSON");
let result = JSON.parse(JSON.stringify(dataObject));
console.timeEnd("JSON");
console.log("");

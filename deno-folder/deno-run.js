import { dataArray } from "../common/deno-data-array.js";
import { dataObject } from "../common/deno-data-object.js";

import SparkMD5 from "./deno-spark-md5.js";

import Base64 from "./deno-base64.js";

const configJSON = await Deno.readTextFile("../common/common.json");
const config = JSON.parse(configJSON);
//sort
console.time("sort-array");
dataArray.sort((a, b) => {
  return a - b;
});
console.timeEnd("sort-array");
console.log("");

// md5
const data = Deno.readFileSync(config.md5Path);
let spark = new SparkMD5.ArrayBuffer();
console.time("md5");
spark.append(data);
console.log(`md5: ${spark.end()}`);
console.timeEnd("md5");
console.log("");

// base64
console.time("Base64");
Base64.encode(data);
console.timeEnd("Base64");
console.log("");

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

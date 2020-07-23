
const result: number[] = [];
const commonPath = Deno.realPathSync('../common');
let limit = Number(Deno.args);

for (let i = 0; i < limit; i++) {
	result.push(Math.round(Math.random() * limit));
}
const data = JSON.stringify(result);
Deno.writeTextFile(`${commonPath}/deno-data-array.js`, `export const dataArray = ${data}`).then(() => {
	console.log('deno create done!');
});

Deno.writeTextFile(`${commonPath}/node-data-array.js`, `exports.dataArray = ${data}`).then(() => {
	console.log('node create done!');
});
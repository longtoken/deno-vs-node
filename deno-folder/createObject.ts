interface Collect {
	[p: string]: any;
}
const collect: Collect = {};
const commmon = Deno.realPathSync('../common');
let count = Number(Deno.args);
for (let i = 0; i < count; i++) {
	collect[`prop_${i}`] = {
		index: i,
		list: [
			{ n: i | 3 }
		]
	};
}

const source = JSON.stringify(collect);
Deno.writeTextFile(`${commmon}/deno-data-object.js`, `export const dataObject = ${source}`).then(() => {
	console.log('deno create done!');
});

Deno.writeTextFile(`${commmon}/node-data-object.js`, `exports.dataObject = ${source}`).then(() => {
	console.log('node create done!');
});
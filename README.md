## deno与node执行性能对比
执行deno-run.js跟node-run.js文件之后可以看到数组排序、md5值、base6值、斐波那契数列、遍历对象跟JSON序列化的执行速度。
执行deno-add-name.js跟node-add-name.js文件之后会找到common.json的folder字段对应的文件目录，把目录下面的js文件中的函数名增加自定义后缀。

## 执行步骤
1. 先安装deno跟nodejs
2. 生成测试数据<br>
	`cd deno-folder` 到deno-folder目录  <br>
		执行 `deno run -A createArray.ts 2000` 跟 `deno run -A createObject.ts 2000`
		生成测试的数组跟对象，2000表示生成个数。
3. 指定读取js文件的目录<br>
  找到common目录的common.json，修改folder对应的值，可以指定要读取的文件目录。
4. 执行比较<br>
  执行`deno run -A deno-run.js`跟`node node-run.js` 可以看到各个测试项目的执行速度。<br>
	执行`deno run -A deno-add-name.js`跟`node node-add-name.js` 会把对应目录的js文件中的函数名进行修改，放在各自目录的target目录下

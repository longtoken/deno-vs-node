const acorn = require("./node-acorn.js");
const estraverse = require("./node-traverse.js");
const esgen = require("./node-esgen.js");

// ast转换
function astTransform(data) {
  // 获取ast
  const ast = acorn.parse(data);

  // 遍历ast
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (node.type === "FunctionDeclaration") {
				node.id.name += '__nodeAST';
      }
    },
  });

  // 生成ast
  return esgen.generate(ast);
}

module.exports = astTransform;
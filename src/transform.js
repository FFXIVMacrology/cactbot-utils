const babel = require("@babel/core");
const t = require("@babel/types");
const fs = require("fs");
const generator = require("@babel/generator").default;
const { promisify } = require("util");

/**
 * @param {string} path
 * @returns {Promise<object>}
 */
const extractTimelineReplace = async (path) => {
  const code = String(await promisify(fs.readFile)(path));

  const ast = await babel.parseAsync(code, {
    presets: ["@babel/preset-typescript"],
    filename: path,
  });

  if (!ast) {
    throw new Error("Cannot parse file: " + path);
  }

  /** @type {import("@babel/types").ArrayExpression | null} */
  let timelineReplaceNode = null;

  babel.traverse(ast, {
    ObjectProperty(path) {
      if (!t.isArrayExpression(path.node.value)) {
        return;
      }

      if (t.isIdentifier(path.node.key) && path.node.key.name === "timelineReplace") {
        timelineReplaceNode = path.node.value;
        return;
      }

      if (t.isStringLiteral(path.node.key) && path.node.key.value === "timelineReplace") {
        timelineReplaceNode = path.node.value;
        return;
      }
    },
  });

  if (!timelineReplaceNode) {
    throw new Error("Cannot find 'timelineReplace' node.");
  }

  const timelineReplaceCode = generator(timelineReplaceNode).code;
  const timelineReplaceJson = eval(timelineReplaceCode);
  return timelineReplaceJson;
};

module.exports = {
  extractTimelineReplace,
};

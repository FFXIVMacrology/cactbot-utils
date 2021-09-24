import * as babel from "@babel/core";
import * as fs from "fs";

import { Identifier, Node } from "@babel/types"

import generator from "@babel/generator";
import { promisify } from "util";

const extractTimelineReplace = async (path: string): Promise<object> => {
  const code = String(await promisify(fs.readFile)(path));

  const ast = await babel.parseAsync(code, {
    presets: [
      "env",
      "typescript"
    ],
  });

  let timelineReplaceNode: Node = null;

  babel.traverse(ast, {
    ObjectProperty(path) {
      if ((path.node.key as Identifier).name === "timelineReplace") {
        timelineReplaceNode = path.node;
      }
    }
  });

  const timelineReplaceCode = generator(timelineReplaceNode).code.substring("timelineReplace: ".length);
  const timelineReplaceJson = eval(timelineReplaceCode);
  return timelineReplaceJson;
}

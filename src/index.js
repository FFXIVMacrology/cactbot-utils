#!/usr/bin/env node
const inquirer = require("inquirer");
const InquirerFuzzyPath = require("inquirer-fuzzy-path");
const { extractTimelineReplace } = require("./transform");

inquirer.registerPrompt("fuzzypath", InquirerFuzzyPath);

inquirer.prompt([{
  name: "action",
  type: "list",
  choices: ["transform test"],
}]).then(async ({ action }) => {
  return await inquirer.prompt([{
    name: "path",
    type: "fuzzypath",
    rootPath: ".",
  }]).then(async ({ path }) => {
    const repl = await extractTimelineReplace(path);
    console.log(repl);
  });
});

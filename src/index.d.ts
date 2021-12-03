import InquirerFuzzyPath = require("inquirer-fuzzy-path");

declare module "inquirer" {
  interface QuestionMap<T> {
    fuzzypath: InquirerFuzzyPath.FuzzyPathQuestionOptions;
  }
}

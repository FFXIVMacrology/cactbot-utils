#!/usr/bin/env node

// babel runtime polyfill
// DO NOT delete it
import "core-js/stable";
import "regenerator-runtime/runtime";

import yargs from "yargs"
import { hideBin } from "yargs/helpers"

import { get_effect_id } from "./xivapi/effect_id.js";

yargs(hideBin(process.argv))
  .command("get <name>", "fetch game contents", () => { }, (argv) => {
    get_effect_id().then((value) => {
      console.log("success!");
    }, (reason) => {
      console.error(reason);
    });
  })
  .demandCommand(1)
  .argv

#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

import { getEffectId } from "./xivapi/effect_id.js";

yargs(hideBin(process.argv))
  .command("get <name>", "fetch game contents", () => { }, (argv) => {
    getEffectId().then((value) => {
      console.log("success!");
    }, (reason) => {
      console.error(reason);
    });
  })
  .demandCommand(1)
  .argv

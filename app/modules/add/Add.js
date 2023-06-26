import { pathController } from "../../index.js";
import path from "path";
import fs from "fs";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import {getCurrentPath} from "../../../utils/getCurrentPath.js";
import {printErrorMessage} from "../../../utils/printErrorMessage.js";

export default class Add {
  constructor(app) {
    this.app = app;
    this.app.on('add', (args) => {
      if (args.length === 1) {
        this.addNewFile(args.join(' '));
      } else {
        printErrorMessage();
        printCurrentPath();
        this.app.setPrompt();
      }
    })
  }

  addNewFile(name) {
    let pathToFile = getCurrentPath(name);
    fs.writeFile(pathToFile, '', (err) => {
      if (err) {
        printFailMessage();
        printCurrentPath();
        this.app.setPrompt();
      } else {
        console.log(`File ${name} created`);
        printCurrentPath();
        this.app.setPrompt();
      }
    })
  }
}

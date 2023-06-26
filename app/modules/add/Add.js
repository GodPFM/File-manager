import { pathController } from "../../index.js";
import path from "path";
import fs from "fs";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import {getCurrentPath} from "../../../utils/getCurrentPath.js";

export default class Add {
  constructor(app) {
    this.app = app;
    this.app.on('add', (args) => {
      this.addNewFile(args.join(' '));
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

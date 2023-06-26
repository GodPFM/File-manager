import { pathController } from "../../index.js";
import path from "path";
import fs from "fs";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";

export default class Add {
  constructor(app) {
    this.app = app;
    this.app.on('add', (args) => {
      this.addNewFile(args.join(' '));
    })
  }

  addNewFile(name) {
    const currentPath = pathController.getCurrentPath();
    let pathToFile = '';
    if (path.isAbsolute(name)) {
      pathToFile = name
    } else {
      pathToFile = path.resolve(currentPath, name);
    }
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

import {getCurrentPath} from "../../../utils/getCurrentPath.js";
import fs from "fs";
import path from "path";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";

export default class Rn {
  constructor(app) {
    this.app = app;
    this.app.on('rn', (args) => {
      const pathToFile = args.shift();
      const name = args.join(' ');
      this.renameFile(pathToFile, name);
    })
  }

  renameFile(pathToFile, newName) {
    const solvedPathToFile = getCurrentPath(pathToFile);
    let nameToChange = '';
    if (path.isAbsolute(newName)) {
      nameToChange = newName
    } else {
      nameToChange = path.join(solvedPathToFile, '..', newName);
    }
    fs.rename(solvedPathToFile, nameToChange, (err) => {
      if (err) {
        printFailMessage();
      } else {
        console.log(`File renamed successfully`);
      }
      printCurrentPath();
      this.app.setPrompt();
    })
  }
}

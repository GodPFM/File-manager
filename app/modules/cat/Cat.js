import {pathController} from "../../index.js";
import path from 'path';
import fs from "fs";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";

export default class Cat {
  constructor(app) {
    this.app = app;
    this.app.on('cat', (arg) => {
      this.catFile(arg.join(' '))
    })
  }

  catFile(pathToFile) {
    const currentPath = pathController.getCurrentPath();
    let filePath = '';
    const isAbsolute = path.isAbsolute(pathToFile)
    if (isAbsolute) {
      filePath = pathToFile;
    } else {
      filePath = path.resolve(currentPath, pathToFile);
    }
    console.log(filePath);
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', () => {
      printFailMessage();
      printCurrentPath();
      this.app.setPrompt();
    })
    readStream.on('data', (data) => {
      process.stdout.write(data);
      printCurrentPath();
      this.app.setPrompt();
    });
  }
}

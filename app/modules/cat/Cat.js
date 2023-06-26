import {pathController} from "../../index.js";
import path from 'path';
import fs from "fs";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import {getCurrentPath} from "../../../utils/getCurrentPath.js";

export default class Cat {
  constructor(app) {
    this.app = app;
    this.app.on('cat', (arg) => {
      this.catFile(arg.join(' '))
    })
  }

  catFile(pathToFile) {
    let filePath = getCurrentPath(pathToFile);
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

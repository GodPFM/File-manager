import { getCurrentPath } from "../../../utils/getCurrentPath.js";
import fs from "fs";
import path from "path";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import {pathController} from "../../index.js";

export default class Cp {
  constructor(app) {
    this.app = app;
    this.app.on('cp', (args) => {
      if (args.length === 2) {
        const pathToFile = args.shift();
        const pathToCopyDest = args.shift();
        this.copyFile(pathToFile, pathToCopyDest);
      } else {
        printFailMessage();
        printCurrentPath();
        this.app.setPrompt();
      }
    })
  }

  copyFile(pathToFile, pathToCopyDest) {
    const solvedPathToFile = getCurrentPath(pathToFile);
    let destPath = '';
    if (path.isAbsolute(pathToCopyDest)) {
      destPath = pathToCopyDest;
    } else {
      destPath = path.resolve(pathController.getCurrentPath(), pathToCopyDest);
    }
    const basename = path.basename(solvedPathToFile);
    const newPathToCopiedFile = path.resolve(destPath, basename);
    const readStream = fs.createReadStream(solvedPathToFile);
    readStream.on('error', () => {
      printFailMessage();
      printCurrentPath();
      this.app.setPrompt();
    })
    readStream.on('open', () => {
      const writeStream = fs.createWriteStream(newPathToCopiedFile);
      writeStream.on('finish', () => {
        process.stdout.write('Copy complete\n');
        printCurrentPath();
        this.app.setPrompt();
      })
      writeStream.on('error', () => {
        printFailMessage();
        printCurrentPath();
        this.app.setPrompt();
      })
      readStream.pipe(writeStream);
    })
  }
}

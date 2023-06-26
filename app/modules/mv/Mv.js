import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import {getCurrentPath} from "../../../utils/getCurrentPath.js";
import path from "path";
import {pathController} from "../../index.js";
import fs from "fs";
import { stat, unlink } from 'fs/promises';

export default class Mv {
  constructor(app) {
    this.app = app;
    this.app.on('mv', (args) => {
      if (args.length === 2) {
        const pathToFile = args.shift();
        const pathToDest = args.shift();
        this.moveFile(pathToFile, pathToDest);
      } else {
        printFailMessage();
        printCurrentPath();
        this.app.setPrompt();
      }
    })
  }

  moveFile(pathToFile, pathToDest) {
    const solvedPathToFile = getCurrentPath(pathToFile);
    let destPath = '';
    if (path.isAbsolute(pathToDest)) {
      destPath = pathToDest;
    } else {
      destPath = path.resolve(pathController.getCurrentPath(), pathToDest);
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
      writeStream.on('finish', async () => {
        try {
          const file = await stat(solvedPathToFile, (err) => {
            if (err) {
              printFailMessage();
            }
          })
          if (file.isFile()) {
            await unlink(solvedPathToFile)
            process.stdout.write('File moved\n');
          } else {
            printFailMessage();
          }
        } catch {
          printFailMessage();
          printCurrentPath();
          this.app.setPrompt();
        }
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

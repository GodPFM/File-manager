import {getCurrentPath} from "../../../utils/getCurrentPath.js";
import fs from "fs";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import crypto from 'crypto';
import path from "path";

export default class Hash {
  constructor(app) {
    this.app = app;
    this.app.on('hash', (args) => {
      const pathToFile = args.join(' ');
      this.calculateHash(pathToFile);
    })
  }

  calculateHash(pathToFile) {
    const solvedPath = getCurrentPath(pathToFile);
    fs.readFile(solvedPath, (err, data) => {
      if (err) {
        printFailMessage();
        printCurrentPath();
        this.app.setPrompt();
        return;
      }
      const hash = crypto.createHash('sha256');
      hash.update(data).setEncoding('hex');
      process.stdout.write(`Cash of file ${path.basename(pathToFile)} - ${hash.digest('hex')}\n`);
      printCurrentPath();
      this.app.setPrompt();
    })
  }
}

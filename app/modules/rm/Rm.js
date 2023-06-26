import {getCurrentPath} from "../../../utils/getCurrentPath.js";
import fs from "fs/promises";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import path from "path";
import {printErrorMessage} from "../../../utils/printErrorMessage.js";

export default class Rm {
  constructor(app) {
    this.app = app;
    this.app.on('rm', async (args) => {
      if (args.length === 1) {
        const pathToFile = args.shift();
        await this.removeFile(pathToFile);
      } else {
        printErrorMessage();
        printCurrentPath();
        this.app.setPrompt();
      }
    })
  }

  async removeFile(pathToFile) {
    const solvedPath = getCurrentPath(pathToFile);
    try {
      const file = await fs.stat(solvedPath, (err) => {
        if (err) {
          printFailMessage();
        }
      })
      if (file.isFile()) {
        await fs.unlink(solvedPath)
        process.stdout.write('File removed\n');
        printCurrentPath();
        this.app.setPrompt();
      } else {
        printFailMessage();
      }
    } catch {
      printFailMessage();
      printCurrentPath();
      this.app.setPrompt();
    }
  }
}

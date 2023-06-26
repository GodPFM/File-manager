import {getCurrentPath} from "../../../utils/getCurrentPath.js";
import fs from "fs/promises";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import path from "path";

export default class Rm {
  constructor(app) {
    this.app = app;
    this.app.on('rm', async (args) => {
      if (args.length) {
        const pathToFile = args.shift();
        await this.removeFile(pathToFile);
      }
    })
  }

  async removeFile(pathToFile) {
    const solvedPath = getCurrentPath(pathToFile);
    const file = await fs.stat(solvedPath, (err) => {
      if (err) {
        printFailMessage();
        printCurrentPath();
        this.app.setPrompt();
      }
    })
    if (file.isFile()) {
      await fs.unlink(solvedPath)
      process.stdout.write(`${path.basename(pathToFile)} deleted\n`);
      printCurrentPath();
      this.app.setPrompt();
    } else {
      printFailMessage();
      printCurrentPath();
      this.app.setPrompt();
    }
  }
}

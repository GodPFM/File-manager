import path from 'path';
import { pathController } from "../../index.js";
import {checkNewPath} from "../../../utils/checkNewPath.js";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";

export default class Cd {
  constructor(app) {
    this.app = app
    this.app.on('up', () => {
      this.back();
    })
    this.app.on('cd', (args) => {
      if (args.length) {
        this.changePath(args.join(' '));
      } else {
        printFailMessage();
        printCurrentPath();
      }
    });
  }

  back() {
    const separator = path.sep;
    const currentPath = pathController.getCurrentPath();
    const newPath = path.join(currentPath, '..', separator);
    pathController.changePath(newPath);
    this.app.setPrompt();
  }

  async changePath(pathToChange) {
    const currentPath = pathController.getCurrentPath();
    let newPath = '';
    const isAbsolute = path.isAbsolute(pathToChange);
    if (isAbsolute) {
      newPath = pathToChange;
    } else {
      newPath = path.resolve(currentPath, pathToChange)
    }
    const checkResult = await checkNewPath(newPath);
    if (checkResult) {
      pathController.changePath(newPath);
    } else {
      printCurrentPath();
    }
    this.app.setPrompt();
  }
}

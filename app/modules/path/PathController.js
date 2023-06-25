import { homedir } from 'os';
import {printCurrentPath} from "../../../utils/printCurrentPath.js";

export default class PathController {
  constructor() {
    this.homedir = homedir();
    this.currentPath = homedir();
  }

  getCurrentPath() {
    return this.currentPath;
  }

  changePath(newPath) {
    this.currentPath = newPath;
    printCurrentPath();
  }
}

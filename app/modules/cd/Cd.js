import path from 'path';
import { pathController } from "../../index.js";

export default class Cd {
  constructor(app) {
    this.app = app
    this.app.on('up', () => {
      this.back();
    })
    this.app.on('cd', (args) => {
      // test
    });
  }

  back() {
    const separator = path.sep;
    const currentPath = pathController.getCurrentPath();
    const newPath = path.join(currentPath, '..', separator);
    pathController.changePath(newPath);
  }
}

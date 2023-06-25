import { printFailMessage } from "../../../utils/printFailMessage.js";
import { pathController } from "../../index.js";
import fs from "fs";
import path from "path";

export default class Ls {
  constructor(app) {
    this.app = app;
    this.app.on('ls', () => {
      this.printFileList();
    })
  }

  printFileList() {
    const currentPath = path.resolve(pathController.getCurrentPath());
    fs.readdir(currentPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        printFailMessage();
      } else {
        const filesArr = files.reduce((acc, item) => {
          acc.push({
            Name: item.name,
            Type: item.isFile() ? 'file' : 'directory',
          })
          return acc;
        }, [])
        const sortedFiles = filesArr.sort((a, b) => (a.Type).localeCompare(b.Type));
        console.table(sortedFiles);
        this.app.setPrompt();
      }
    })
  }
}

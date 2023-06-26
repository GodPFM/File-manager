import {getCurrentPath} from "../../../utils/getCurrentPath.js";
import path from "path";
import {pathController} from "../../index.js";
import fsp from "fs/promises";
import fs from 'fs';
import {printErrorMessage} from "../../../utils/printErrorMessage.js";
import zlib from "zlib";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";

export default class Archive {
  constructor(app) {
    this.app = app;
    this.app.on('compress', (args) => {
      if (args.length >= 2) {
        const pathToFile = args.shift();
        const dest = args.shift();
        this.compress(pathToFile, dest);
      }
    })

    this.app.on('decompress', (args) => {
      if (args.length >= 2) {
        const pathToFile = args.shift();
        const dest = args.shift();
        this.decompress(pathToFile, dest);
      }
    })
  }

  async compress(pathToFile, pathToDest) {
    const currentPath = getCurrentPath(pathToFile);
    let destPath = '';
    if (path.isAbsolute(pathToDest)) {
      destPath = pathToDest;
    } else {
      destPath = path.resolve(pathController.getCurrentPath(), pathToDest);
    }
    const fileInformation = await fsp.stat(currentPath);
    if (!fileInformation.isFile()) {
      printErrorMessage();
    } else {
      const brotli = zlib.createBrotliCompress();
      const readStream = fs.createReadStream(currentPath);
      const writeStream = fs.createWriteStream(path.resolve(destPath, path.basename(pathToFile + '.gz')));

      readStream.on('error', this.streamError)
      writeStream.on('error', this.streamError)
      readStream.pipe(brotli).pipe(writeStream);
      writeStream.on('finish', () => {
        process.stdout.write('Compress completed');
        this.streamSuccess();
      })
    }
  }

  async decompress(pathToFile, pathToDest) {
    const currentPath = getCurrentPath(pathToFile);
    let destPath = '';
    if (path.isAbsolute(pathToDest)) {
      destPath = pathToDest;
    } else {
      destPath = path.resolve(pathController.getCurrentPath(), pathToDest);
    }
    const fileInformation = await fsp.stat(currentPath);
    const isGz = path.extname(path.basename(pathToFile)) === '.gz';
    if (!fileInformation.isFile() && isGz) {
      printErrorMessage();
    } else {
      const brotli = zlib.createBrotliDecompress();
      const readStream = fs.createReadStream(currentPath);
      const splitDestPath = path.basename(pathToFile).split('.')
      splitDestPath.pop()
      const correctDestPath = splitDestPath.join('.');
      const writeStream = fs.createWriteStream(path.resolve(destPath, correctDestPath));

      readStream.on('error', this.streamError);
      writeStream.on('error', this.streamError);
      readStream.pipe(brotli).pipe(writeStream);
      writeStream.on('finish', () => {
        process.stdout.write('Decompress completed');
        this.streamSuccess()
      })
    }
  }

  streamError() {
    printFailMessage();
    printCurrentPath();
    this.app.setPrompt();
  }

  streamSuccess() {
    printCurrentPath();
    this.app.setPrompt();
  }
}

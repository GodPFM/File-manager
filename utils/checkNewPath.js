import fs from 'fs/promises';
import {printFailMessage} from "./printFailMessage.js";

export const checkNewPath = async (newPath) => {
  try {
    const fileInformation = await fs.stat(newPath);
    return fileInformation.isDirectory();

  } catch {
    printFailMessage();
  }
}

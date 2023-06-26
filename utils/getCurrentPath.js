import {pathController} from "../app/index.js";
import path from "path";

export const getCurrentPath = (receivedPath) => {
  const currentPath = pathController.getCurrentPath();
  if (path.isAbsolute(receivedPath)) {
    return receivedPath;
  } else {
    return path.resolve(currentPath, receivedPath);
  }
}

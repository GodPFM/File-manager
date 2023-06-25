import { pathController } from "../app/index.js";

export const printCurrentPath = () => {
  const currentPath = pathController.getCurrentPath();
  process.stdout.write(`You are currently in ${currentPath}\n`)
}

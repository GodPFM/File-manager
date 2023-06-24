import readline from "readline";
import { parseArgs } from "../utils/parseArgs.js";
import { printWelcomeMessage } from "../utils/printWelcomeMessage.js";
import { printExitMessage } from "../utils/printExitMessage.js";
import { printSuggestToEnterName } from "../utils/printSuggestToEnterName.js";
import { printErrorMessage } from "../utils/printErrorMessage.js";

export default class App {
  constructor() {
    this.username = null;
  }

  start() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    })

    this.username = parseArgs();
    if (!this.username) {
      printSuggestToEnterName();
    } else {
      printWelcomeMessage(this.username);
      rl.prompt();
    }

    rl.on('SIGINT', () => {
      rl.close();
      printExitMessage();
    })

    rl.on('line', (line) => {
      const data = line.trim();
      if (line === '.exit') {
        rl.close();
        printExitMessage(this.username);
        return;
      }
      if (!this.username && data) {
        this.username = data;
        printWelcomeMessage(this.username);
        rl.prompt();
      } else if (!data) {
        printErrorMessage();
        printSuggestToEnterName();
      }
    })
  }
}

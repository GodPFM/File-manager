import readline from "readline";
import EventEmitter from 'events'
import { getName } from "../utils/getName.js";
import { printWelcomeMessage } from "../utils/printWelcomeMessage.js";
import { printExitMessage } from "../utils/printExitMessage.js";
import { printSuggestToEnterName } from "../utils/printSuggestToEnterName.js";
import { printErrorMessage } from "../utils/printErrorMessage.js";
import { printCurrentPath } from "../utils/printCurrentPath.js";
import { parseArgs } from "../utils/parseArgs.js";

export default class App extends EventEmitter {
  constructor() {
    super();
    this.username = null;
  }

  start() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    })

    this.username = getName();
    if (!this.username) {
      printSuggestToEnterName();
    } else {
      printWelcomeMessage(this.username);
      printCurrentPath();
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
        printCurrentPath();
        rl.prompt();
      } else if (!data) {
        printErrorMessage();
        printSuggestToEnterName();
      } else {
        const parsedCommand = parseArgs(line);
        if (parsedCommand) {
          this.emit(parsedCommand.command, parsedCommand.arguments);
        }
      }
      rl.prompt()
    })
  }
  on(event, callback) {
    return super.on(event, callback);
  }

  emit(event, arg) {
    return super.emit(event, arg);
  }
}

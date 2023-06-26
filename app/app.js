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
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> '
    });
  }

  start() {
    this.username = getName();
    if (!this.username) {
      printSuggestToEnterName();
    } else {
      printWelcomeMessage(this.username);
      printCurrentPath();
      this.rl.prompt();
    }

    this.rl.on('SIGINT', () => {
      this.rl.close();
      printExitMessage(this.username);
    })

    this.rl.on('line', (line) => {
      const data = line.trim();
      if (line === '.exit') {
        this.rl.close();
        printExitMessage(this.username);
        return;
      }
      if (!this.username && data) {
        this.username = data;
        printWelcomeMessage(this.username);
        printCurrentPath();
        this.rl.prompt();
      } else if (!this.username && !data) {
        printErrorMessage();
        printSuggestToEnterName();
      } else {
        const parsedCommand = parseArgs(line);
        if (parsedCommand) {
          this.emit(parsedCommand.command, parsedCommand.arguments);
        } else {
          printCurrentPath();
          this.rl.prompt();
        }
      }
    })
  }

  setPrompt() {
    this.rl.prompt();
  }
  on(event, callback) {
    return super.on(event, callback);
  }

  emit(event, arg) {
    return super.emit(event, arg);
  }
}

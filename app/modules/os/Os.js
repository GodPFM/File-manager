import os from "os";
import {printCurrentPath} from "../../../utils/printCurrentPath.js";
import {pathController} from "../../index.js";
import {printFailMessage} from "../../../utils/printFailMessage.js";
import {printErrorMessage} from "../../../utils/printErrorMessage.js";

export default class Os {
  constructor(app) {
    this.app = app;
    this.app.on('os', (args) => {
      if (args.length === 1) {
        const filteredArgument = args.filter((item) => item.includes('--'));
        if (filteredArgument) {
          const command = filteredArgument.shift();
          switch (command) {
            case '--EOL':
              this.getEOL();
              break;
            case '--cpus':
              this.getCPUS();
              break;
            case '--homedir':
              this.getHomedir();
              break;
            case '--username':
              this.getUsername()
              break;
            case '--architecture':
              this.getArch()
              break;
            default:
              printErrorMessage();
              this.printErrorMessage();
          }
        }
      } else {
        printErrorMessage();
        this.printErrorMessage();
      }
    })
  }

  printErrorMessage() {
    printCurrentPath();
    this.app.setPrompt();
  }

  getEOL() {
    process.stdout.write(`EOL is - ${JSON.stringify(os.EOL)}\n`);
    this.printCompleteMessage()
  }

  getCPUS() {
    const cpus = os.cpus();
    const information = cpus.map((item, index) => {
      return {
        model: item.model,
        speed: `${item.speed / 1000}GHz`
      }
    })
    process.stdout.write(`Amount of CPUs - ${cpus.length}\n`);
    console.table(information);
    this.printCompleteMessage()
  }

  getHomedir() {
    const homedir = pathController.homedir;
    process.stdout.write(`Homedir is ${homedir}\n`);
    this.printCompleteMessage()
  }

  getUsername() {
    const username = os.userInfo().username;
    process.stdout.write(`Username is ${username}\n`);
    this.printCompleteMessage()
  }

  getArch() {
    const arch = os.arch();
    process.stdout.write(`CPU architecture is ${arch}\n`);
    this.printCompleteMessage()
  }

  printCompleteMessage() {
    printCurrentPath();
    this.app.setPrompt()
  }
}

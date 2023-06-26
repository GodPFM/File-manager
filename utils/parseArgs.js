import {printErrorMessage} from "./printErrorMessage.js";

const commands = ['cd', 'up', 'ls', 'cat', 'add', 'rn', 'cp'];

export const parseArgs = (line) => {
  const commandWithArguments = line.split(' ').filter((item) => item !== '');
  if (!commands.includes(commandWithArguments[0])) {
    printErrorMessage();
    return null;
  }
  return  commandWithArguments.reduce((acc, item, index) => {
    if (index === 0) {
      acc.command = item;
    } else {
      acc.arguments.push(item);
    }
    return acc;
  }, {
    command: null,
    arguments: [],
  })
}

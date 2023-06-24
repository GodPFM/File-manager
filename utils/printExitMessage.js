export const printExitMessage = (name) => {
  if (!name) {
    process.stdout.write('\nAlthough I don\'t know your name, thank you for using File Manager. Goodbye!')
  } else {
    process.stdout.write(`\nThank you for using File Manager, ${name}, goodbye!`)
  }
}

export const getName = () => {
  const args = process.argv;
  let result = '';
  args.forEach((item, index) => {
    if (item.startsWith('--') && item.includes('username=') && !result) {
      result += item.replace('--username=', '');
    }
  });
  return result;
};

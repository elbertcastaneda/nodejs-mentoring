/* eslint-disable @typescript-eslint/no-var-requires */
const process = require('process');

process.stdin.addListener('data', (inputText) => {
  const textReceivedReversed = inputText.reverse().toString().trim();

  // eslint-disable-next-line no-console
  console.log(textReceivedReversed);
});

const process = require('process');

process.stdin.addListener('data', inputText => {
  const textReceivedReversed = inputText.reverse().toString().trim();

  console.log(textReceivedReversed);
});
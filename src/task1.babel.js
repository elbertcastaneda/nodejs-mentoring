import process from 'process';

process.stdin.addListener('data', inputText => {
  const textReceivedReversed = inputText.reverse().toString().trim();

  console.log(textReceivedReversed);
});
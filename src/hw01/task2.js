/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const csv = require('csvtojson');
const stream = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const { promisify } = require('util');

const pipeline = promisify(stream.pipeline);

pipeline(
  createReadStream('./csv/nodejs-hw1-ex1.csv', { encoding: 'utf8' }),
  csv({ headers: ['book', 'author', 'price'], noheader: false, output: 'json' }),
  createWriteStream('./csv/nodejs-hw1-ex1.txt'),
)
  .then(() => {
    console.log('CSV converted to json successfully');
  })
  .catch((err) => {
    console.error(err.message);
  });

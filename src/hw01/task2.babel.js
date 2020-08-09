/* eslint-disable no-console */
import csv from 'csvtojson';
import stream from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

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

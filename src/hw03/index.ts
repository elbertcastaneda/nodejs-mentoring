import cluster, { Worker } from 'cluster';
import { cpus } from 'os';
import process from 'process';

import { createPrivateKey, createAndReadPrivateKey, readPrivateKey } from 'config/jwt.config';
import main from './main';

const keysPath = '.jwt/server.key';
const isProduction = process.env.NODE_ENV === 'production';

if (cluster.isPrimary && isProduction) {
  const numCPUs = cpus().length;
  const workers: Worker[] = [];

  console.log(`Primary ${process.pid} is running`);

  createPrivateKey(keysPath).then(() => {
    for (let i = 0; i < numCPUs; i++) {
      workers.push(cluster.fork());
    }
  });
} else {
  if (isProduction) {
    readPrivateKey(keysPath).then((keys) => {
      main(keys);
    });
  } else {
    createAndReadPrivateKey(keysPath).then((keys) => {
      main(keys);
    });
  }
}

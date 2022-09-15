import cluster, { Worker } from 'cluster';
import { cpus } from 'os';
import process from 'process';

import { createPrivateKey, readPrivateKey } from 'config/jwt.config';
import main from './main';

if (cluster.isPrimary) {
  const numCPUs = cpus().length;
  const workers: Worker[] = [];

  console.log(`Primary ${process.pid} is running`);

  createPrivateKey('.jwt/server.key').then(() => {
    for (let i = 0; i < numCPUs; i++) {
      workers.push(cluster.fork());
    }
  });
} else {
  readPrivateKey('.jwt/server.key').then((keys) => {
    main(keys);
  });
}

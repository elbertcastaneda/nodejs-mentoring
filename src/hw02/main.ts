import express from 'express';
import apiModules from './api';

const main = async (): Promise<void> => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(apiModules);

  await app.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('Server running in: http://localhost:5000/');
  });
};

export default main;

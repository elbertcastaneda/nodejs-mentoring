import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import apiModulesCreators from './api';
import { serverErrorHandler, simpleLogger } from './middlewares';

const startServer = async (): Promise<void> => {
  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(simpleLogger);

  app.use(apiModulesCreators.map((createModule) => createModule()));
  app.use(serverErrorHandler);

  await app.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('Server running in: http://localhost:5000/');
  });
};

const main = () => createConnection(typeOrmConfig)
  .then(async () => {
    await startServer();
  })
  // eslint-disable-next-line no-console
  .catch((error) => console.error('TypeORM connection error: ', error));
export default main;

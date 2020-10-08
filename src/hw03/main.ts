import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { isApiError, logger } from './_utils';
import apiModulesCreators from './api';
import { profiler, serverErrorHandler, simpleLogger } from './middlewares';

const startServer = async (): Promise<void> => {
  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(simpleLogger);
  app.use(profiler);

  app.use(apiModulesCreators.map((createModule) => createModule()));
  app.use(serverErrorHandler);

  // get the unhandled rejection and throw it to another fallback handler we already have.
  process.on('unhandledRejection', (reason: Error) => {
    throw reason;
  });

  process.on('uncaughtException', (error: Error) => {
    logger.fatal(error.message, error);

    if (!isApiError(error)) {
      process.exit(1);
    }
  });

  await app.listen(5000, () => {
    logger.debug('Server running in: http://localhost:5000/');
  });
};

const main = () => createConnection(typeOrmConfig)
  .then(async () => {
    await startServer();
  })
  .catch((error) => logger.fatal('TypeORM connection error: ', error));

export default main;

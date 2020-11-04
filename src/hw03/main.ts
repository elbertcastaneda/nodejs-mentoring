import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { createConnection } from 'typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { isApiError, logger } from '_utils';
import apiModulesCreators from 'api';
import security from 'security';
import { profiler, serverErrorHandler, simpleLogger } from './middlewares';

const startServer = async (): Promise<void> => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
        return false;
      }

      // fallback to standard filter function
      return compression.filter(req, res);
    },
  }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(simpleLogger);
  app.use(profiler);

  app.use([
    security,
    ...apiModulesCreators.map((createModule) => createModule()),
  ]);
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

  const port = process.env.WEBSERVER_PORT || 5000;

  await app.listen(port, () => {
    logger.debug(`Server running in: http://localhost:${port}/`);
  });
};

const main = () => createConnection(typeOrmConfig)
  .then(async () => {
    logger.debug('Connected to database.');
    await startServer();
  })
  .catch((error) => logger.fatal('TypeORM connection error: ', error));

export default main;

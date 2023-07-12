import compression, { filter } from 'compression';
import cors from 'cors';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';

import { isApiError, logger } from '~/_utils';
import apiModulesCreators from '~/api';
import { Keys } from '~/config/jwt.config';
import dataSource from '~/config/typeorm.config';
import createSecurityRouter from '~/security';
import { profiler, serverErrorHandler, simpleLogger } from '~/middlewares';

const startServer = async (keys: Keys): Promise<void> => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(
    compression({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          // don't compress responses with this request header
          return false;
        }

        // fallback to standard filter function
        return filter(req, res);
      },
    })
  );

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(simpleLogger);
  app.use(profiler);

  app.use([
    createSecurityRouter(keys),
    ...apiModulesCreators.map((createModule) => createModule(keys)),
  ]);
  app.use(serverErrorHandler);

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Page not found' });
  });

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

  const port = process.env.WEBSERVER_PORT || 6000;

  await app.listen(port, () => {
    logger.debug(`Server running in: http://localhost:${port}/`);
  });
};

const main = (keys: Keys) =>
  dataSource
    .initialize()
    .then(async () => {
      logger.debug('Connected to database.');

      await startServer(keys);
    })
    .catch((error) => logger.fatal('TypeORM connection error: ', error));

export default main;

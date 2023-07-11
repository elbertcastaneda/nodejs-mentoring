import { json, urlencoded } from 'express';
import apiModules from './api';

const main = async (): Promise<void> => {
  const app = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(apiModules);

  await app.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('Server running in: http://localhost:5000/');
  });
};

export default main;

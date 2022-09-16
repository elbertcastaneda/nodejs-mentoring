import 'reflect-metadata';
import { DatabaseType, DataSource } from 'typeorm';

const {
  TYPEORM_DATABASE = 'ngmp20',
  TYPEORM_HOST = 'localhost',
  TYPEORM_LOGGING = false,
  TYPEORM_PASSWORD = 'changeme',
  TYPEORM_PORT = 5432,
  TYPEORM_SYNCHRONIZE = false,
  TYPEORM_USERNAME = 'postgres',
} = process.env;

const postgresDatabase: DatabaseType = 'postgres';

export default new DataSource({
  name: 'default',
  database: TYPEORM_DATABASE,
  entities: [__dirname + '/../**/*.entity.ts'],
  host: TYPEORM_HOST,
  logging: Boolean(TYPEORM_LOGGING),
  migrations: [__dirname + '/../migrations/*.ts'],
  password: TYPEORM_PASSWORD,
  port: Number(TYPEORM_PORT),
  subscribers: [__dirname + '/../**/*.subscriber.ts'],
  synchronize: Boolean(TYPEORM_SYNCHRONIZE),
  type: postgresDatabase,
  username: TYPEORM_USERNAME,
});

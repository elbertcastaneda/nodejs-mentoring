import 'reflect-metadata';
import { DatabaseType, DataSource } from 'typeorm';

import User from '~/api/users/user.entity';
import Group from '~/api/groups/group.entity';

import { Initialize1664666415827 } from '~/migrations/1664666415827-Initialize';
import { SeedUsers1664666476599 } from '~/migrations/1664666476599-SeedUsers';

import BaseEntitySubscriber from '~/api/_base/baseEntity.subscriber';
import UserSubscriber from '~/api/users/user.subscriber';

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
  entities: [User, Group],
  host: TYPEORM_HOST,
  logging: Boolean(TYPEORM_LOGGING),
  migrations: [Initialize1664666415827, SeedUsers1664666476599],
  password: TYPEORM_PASSWORD,
  port: Number(TYPEORM_PORT),
  subscribers: [BaseEntitySubscriber, UserSubscriber],
  synchronize: Boolean(TYPEORM_SYNCHRONIZE),
  type: postgresDatabase,
  username: TYPEORM_USERNAME,
  migrationsTransactionMode: 'each',
});

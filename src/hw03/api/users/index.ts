import UserController from './user.controller';
import createUserRepository from './user.repository';

// Simple Dependency injection simulation
const createUsersModule = () =>
  UserController.create(createUserRepository()).getRouter();

export default createUsersModule;

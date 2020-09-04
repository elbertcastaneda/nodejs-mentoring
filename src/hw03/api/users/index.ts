import UserController from './user.controller';
import createUserRepository from './user.repository';

// Simple Dependency injection simulation
const createUserModule = () => UserController.create(createUserRepository()).getRouter();

export default createUserModule;

import UserController from './user.controller';
import UserService from './user.service';

// Simple Dependency injection simulation
const createUsersModule = () => UserController.create(UserService.create()).getRouter();

export default createUsersModule;

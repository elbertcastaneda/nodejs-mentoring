import UserController from './user.controller';
import UserRepository from './user.repository';

// Simple Dependency injection simulation
export default UserController.create(UserRepository.create()).getRouter();

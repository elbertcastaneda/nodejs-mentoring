import db from 'db';
import UsersController from './users.controller';
import UsersRepository from './users.repository';

// Simple Dependency injection simulation
export default UsersController.create(UsersRepository.create(db.users)).getRouter();

import GroupController from './group.controller';
import createGroupRepository from './group.repository';

// Simple Dependency injection simulation
const createGroupModule = () => GroupController.create(createGroupRepository()).getRouter();

export default createGroupModule;

import GroupController from './group.controller';
import GroupService from './group.service';

// Simple Dependency injection simulation
const createGroupModule = () => GroupController.create(GroupService.create()).getRouter();

export default createGroupModule;

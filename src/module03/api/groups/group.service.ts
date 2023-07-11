import { BadRequestError, NotFoundError } from '~/errors';

import BaseService from '~/api/_base/baseService';
import UserService from '~/api/users/user.service';

import Group from './group.entity';
import User from '~/api/users/user.entity';

const getNotFoundByIdMessage = (id: string) => `Group with id: '${id}' not found`;

export default class GroupService extends BaseService<Group> {
  private static instance: GroupService;

  public static create() {
    GroupService.instance = GroupService.instance || new GroupService();

    return GroupService.instance;
  }

  constructor() {
    super(Group);
  }

  async findById(id: string) {
    const group = await this.repository.findOne({ relations: ['users'], where: { id } });

    if (!group) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    return group;
  }

  async findAll() {
    const groups = await this.repository.find({ order: { name: 'ASC' } });

    return groups;
  }

  async delete(id: string, authUser: User) {
    const group = await this.findById(id);

    const result = await this.repository.softRemove(group, { data: authUser });

    return result;
  }

  async save(partialEntity: Partial<Group>, authUser: User) {
    const group = new Group();

    group.name = partialEntity.name || group.name;
    group.permissions = partialEntity.permissions || group.permissions;

    const savedGroup = await this.repository.save(group, { data: authUser });

    return savedGroup;
  }

  async update(id: string, partialEntity: Partial<Group>, authUser: User) {
    const group = await this.findById(id);

    group.name = partialEntity.name || group.name;
    group.permissions = partialEntity.permissions || group.permissions;

    this.repository.save(group, { data: authUser });
  }

  async addUsers(id: string, userIds: string[], authUser: User) {
    const group = await this.findById(id);
    const userService = UserService.create();
    const users = await userService.findByIds(userIds);

    if (users.length !== userIds.length) {
      throw new BadRequestError('Some or all users received does not exist in the system');
    }

    if (!group.users) {
      throw new BadRequestError('Users collection is necessary in the group to add user to it');
    }

    const currentUserIds = group.users.map((cu) => cu.id);
    const notAssignedUsers = users.filter((uf) => !currentUserIds.includes(uf.id));

    if (!notAssignedUsers.length) {
      return group.users;
    }

    group.users.push(...notAssignedUsers);

    const savedGroup = await this.repository.save(group, { data: authUser });

    return savedGroup.users;
  }
}

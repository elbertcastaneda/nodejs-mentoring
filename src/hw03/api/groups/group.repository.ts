import {
  AbstractRepository,
  EntityRepository,
  getCustomRepository,
} from 'typeorm';
import { BadRequestError, NotFoundError } from 'errors';
import createUserRepository from 'api/users/user.repository';

import Group from './group.entity';

const getNotFoundByIdMessage = (id: string) =>
  `Group with id: '${id}' not found`;

@EntityRepository(Group)
export class GroupRepository extends AbstractRepository<Group> {
  async getById(id: string) {
    const group = await this.repository.findOne(id, { relations: ['users'] });

    if (!group) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    return group;
  }

  async findAll() {
    const groups = await this.repository.find({ order: { name: 'ASC' } });

    return groups;
  }

  async delete(id: string) {
    const result = await this.repository.delete(id);

    if (!result.affected) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    return result;
  }

  async save(partialEntity: Partial<Group>) {
    const group = new Group();

    group.name = partialEntity.name || group.name;
    group.permissions = partialEntity.permissions || group.permissions;

    const savedGroup = await this.repository.save(group);

    return savedGroup;
  }

  async update(id: string, partialEntity: Partial<Group>) {
    const group = await this.getById(id);

    group.name = partialEntity.name || group.name;
    group.permissions = partialEntity.permissions || group.permissions;

    const savedGroup = await this.repository.save(group);

    return savedGroup;
  }

  async addUsers(id: string, userIds: string[]) {
    const group = await this.getById(id);
    const usersRepository = createUserRepository();
    const users = await usersRepository.findByIds(userIds);

    if (users.length !== userIds.length) {
      throw new BadRequestError(
        'Some or all users received does not exist in the system'
      );
    }

    if (!group.users) {
      throw new BadRequestError(
        'Users collection is necessary in the group to add user to it'
      );
    }

    const currentUserIds = group.users.map((cu) => cu.id);
    const notAssignedUsers = users.filter(
      (uf) => !currentUserIds.includes(uf.id)
    );

    if (!notAssignedUsers.length) {
      return group.users;
    }

    group.users.push(...notAssignedUsers);

    const savedGroup = await this.repository.save(group);

    return savedGroup.users;
  }
}

const createGroupRepository = () => getCustomRepository(GroupRepository);

export default createGroupRepository;

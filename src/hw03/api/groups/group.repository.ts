import {
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { NotFoundError } from 'errors';
import Group from './group.entity';

const getNotFoundByIdMessage = (id: string) => `Group wit id: '${id}' not found`;

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  async getById(id: string) {
    const group = await this.findOne({ id });

    if (!group) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    return group;
  }

  async findAll() {
    const groups = await this.find({ order: { name: 'ASC' } });

    return groups;
  }
}

const createGroupRepository = () => getCustomRepository(GroupRepository);

export default createGroupRepository;

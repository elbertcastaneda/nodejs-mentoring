import {
  EntityRepository,
  DeleteResult,
  getCustomRepository,
  Like,
  Repository,
} from 'typeorm';
import { NotFoundError } from 'errors';
import FindAllDto from './dtos/findAllDto';
import User from './user.entity';

const getNotFoundByIdMessage = (id: string) => `User wit id: '${id}' not found`;

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getById(id: string) {
    const user = await this.findOne({
      where: { id, isDeleted: false },
    });

    if (!user) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    return user;
  }

  async findAll({ loginSubstring, limit = 50 }: FindAllDto) {
    const users = await this.find({
      where: {
        ...(loginSubstring ? { login: Like(`%${loginSubstring}%`) } : {}),
        isDeleted: false,
      },
      order: { login: 'ASC' },
      take: limit,
    });

    return users;
  }

  async delete(id: string) {
    const deleteResult = new DeleteResult();

    await this.update(id, { isDeleted: true });
    deleteResult.affected = 1;

    return deleteResult;
  }
}

const createUserRepository = () => getCustomRepository(UserRepository);

export default createUserRepository;

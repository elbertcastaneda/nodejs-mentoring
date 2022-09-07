import {
  AbstractRepository,
  EntityRepository,
  DeleteResult,
  getCustomRepository,
  Like,
  In,
} from 'typeorm';
import { NotFoundError } from 'errors';
import FindAllDto from './dtos/findAll.dto';
import User from './user.entity';

const getNotFoundByLoginMessage = (login: string) =>
  `User with login: '${login}' not found`;
const getNotFoundByIdMessage = (id: string) =>
  `User with id: '${id}' not found`;

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async getById(id: string) {
    const user = await this.repository.findOne({
      where: { id, isDeleted: false },
    });

    if (!user) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    return user;
  }

  async getByLogin(login: string) {
    const user = await this.repository.findOne({
      where: { login, isDeleted: false },
    });

    if (!user) {
      throw new NotFoundError(getNotFoundByLoginMessage(login));
    }

    return user;
  }

  async findAll({ loginSubstring, limit = 50 }: FindAllDto) {
    const users = await this.repository.find({
      where: {
        ...(loginSubstring ? { login: Like(`%${loginSubstring}%`) } : {}),
        isDeleted: false,
      },
      order: { login: 'ASC' },
      take: limit,
    });

    return users;
  }

  async findByIds(ids: string[]) {
    const users = await this.repository.find({
      where: {
        id: In(ids),
        isDeleted: false,
      },
      order: { login: 'ASC' },
    });

    return users;
  }

  async delete(id: string) {
    const user = await this.repository.findOne({
      where: { id, isDeleted: false },
    });
    const deleteResult = new DeleteResult();

    if (!user) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    await this.repository.update(id, { isDeleted: true });

    deleteResult.affected = 1;

    return deleteResult;
  }

  async save(partialEntity: Partial<User>) {
    const user = new User();

    user.login = partialEntity.login || user.login;
    user.password = partialEntity.password;
    user.age = partialEntity.age;

    const result = await this.repository.save(user);

    return result;
  }

  async update(id: string, partialEntity: Partial<User>) {
    const user = await this.repository.findOne({
      where: { id, isDeleted: false },
    });

    if (!user) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    user.login = partialEntity.login || user.login;
    user.password = partialEntity.password || user.password;
    user.age = partialEntity.age || user.age;

    const result = await this.repository.save(user);

    return result;
  }
}

const createUserRepository = () => getCustomRepository(UserRepository);

export default createUserRepository;

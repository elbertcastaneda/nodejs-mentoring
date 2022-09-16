import { Like, In, FindOptionsSelectByString } from 'typeorm';
import { NotFoundError } from 'errors';

import BaseService from 'api/_base/baseService';

import FindAllDto from './dtos/findAll.dto';

import User from './user.entity';

const getNotFoundByLoginMessage = (login: string) => `User with login: '${login}' not found`;
const getNotFoundByIdMessage = (id: string) => `User with id: '${id}' not found`;

const getFieldsWithoutPassword = (includePassword: boolean = false) =>
  includePassword
    ? undefined
    : (Object.getOwnPropertyNames(new User()).filter(
        (field) => !['password', 'salt'].includes(field)
      ) as FindOptionsSelectByString<User>);

export default class UserService extends BaseService<User> {
  private static instance: UserService;

  public static create() {
    UserService.instance = UserService.instance || new UserService();

    return UserService.instance;
  }

  constructor() {
    super(User);
  }

  async findById(id: string, includePassword = false) {
    const select = getFieldsWithoutPassword(includePassword);

    const user = await this.repository.findOne({
      select,
      where: { id },
    });

    if (!user) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    return user;
  }

  async findByLogin(login: string, includePassword = false) {
    const select = getFieldsWithoutPassword(includePassword);

    const user = await this.repository.findOne({
      select,
      where: { login },
    });

    if (!user) {
      throw new NotFoundError(getNotFoundByLoginMessage(login));
    }

    return user;
  }

  async findAll({ loginSubstring, limit = 50 }: FindAllDto) {
    const select = getFieldsWithoutPassword();

    const users = await this.repository.find({
      order: { login: 'ASC' },
      select: select,
      take: limit,
      where: {
        ...(loginSubstring ? { login: Like(`%${loginSubstring}%`) } : {}),
      },
    });

    return users;
  }

  async findByIds(ids: string[]) {
    const select = getFieldsWithoutPassword();

    const users = await this.repository.find({
      order: { login: 'ASC' },
      select,
      where: {
        id: In(ids),
      },
    });

    return users;
  }

  async delete(id: string, authUser: User) {
    const user = await this.findById(id);

    return this.repository.softRemove(user, { data: authUser });
  }

  async save(partialEntity: Partial<User>, authUser: User) {
    const user = new User();

    user.login = partialEntity.login!;
    user.password = partialEntity.password!;
    user.age = partialEntity.age!;

    const savedUser = await this.repository.save(user, { data: authUser });

    return this.findById(savedUser.id);
  }

  async update(id: string, partialEntity: Partial<User>, authUser: User) {
    const user = await this.findById(id, true);

    user.login = partialEntity.login || user.login;
    user.password = partialEntity.password || user.password;
    user.age = partialEntity.age || user.age;

    this.repository.save(user, { data: authUser });
  }
}

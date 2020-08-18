import { validate } from 'class-validator';
import db from 'db';
import { NotFoundError, ValidationError } from 'errors';
import GetAutoSuggestDto from './dtos/getAutoSuggestDto';
import UserModel, { User } from './user.model';

const getNotFoundByIdMessage = (id: string) => `User wit id: '${id}' not found`;
const getNotFoundByLoginMessage = (login: string) => `User with login: '${login}' not found`;

const validateUser = async (user: UserModel) => {
  const validationErrors = await validate(user);

  if (validationErrors.length > 0) {
    const errors = validationErrors.reduce((acc, { constraints }) => {
      if (!constraints) {
        return acc;
      }

      acc.push(...Object.entries(constraints).map(([constrain, msg]) => `[${constrain}]: ${msg}`));

      return acc;
    }, [] as string[]);

    throw new ValidationError(errors);
  }
};

export default class UserRepository {
  private users: Map<string, User>;

  static create(users = db.users) {
    return new UserRepository(users);
  }

  constructor(users: Map<string, User>) {
    this.users = users;
  }

  getById(id: string) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundError(getNotFoundByIdMessage(id));
    }

    return user;
  }

  getByLogin(login: string) {
    const user = Array.from(this.users.values())
      .find((u) => u.login === login && !u.isDeleted);

    if (!user) {
      throw new NotFoundError(getNotFoundByLoginMessage(login));
    }

    return user;
  }

  getAutoSuggest({ loginSubstring, limit }: GetAutoSuggestDto) {
    const autoSuggestUsers = Array.from(this.users.values())
      .filter((u) => (!loginSubstring || u.login.includes(loginSubstring)) && !u.isDeleted)
      .sort((a, b) => a.login.localeCompare(b.login));

    return limit ? autoSuggestUsers.slice(0, limit) : autoSuggestUsers;
  }

  async create({ login, age, password }: User) {
    const user = new UserModel(login);

    Object.assign(user, { login, age, password });

    await validateUser(user);

    this.users.set(user.id, user);

    return user;
  }

  async update(id: string, { login, age, password }: User) {
    const user = this.getById(id);
    const userToValidate = Object.assign(new UserModel(), user, { login, age, password });

    await validateUser(userToValidate);

    return Object.assign(user, { login, age, password });
  }

  delete(id: string) {
    const user = this.getById(id);

    user.isDeleted = true;
  }
}

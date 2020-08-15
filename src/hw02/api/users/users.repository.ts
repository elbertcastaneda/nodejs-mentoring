import { NotFoundError } from 'errors';
import GetAutoSuggestDto from './dtos/get-auto-suggest.dto';
import UserModel, { User } from './user.model';

const getNotFoundMessage = (id: string) => `User wit id: '${id}' not found`;

export default class UsersRepository {
  private users: Map<string, User>;

  static create(users: Map<string, User>) {
    return new UsersRepository(users);
  }

  constructor(users: Map<string, User>) {
    this.users = users;
  }

  getById(id: string) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundError(getNotFoundMessage(id));
    }

    return user;
  }

  getAutoSuggest({ loginSubstring, limit }: GetAutoSuggestDto) {
    const autoSuggestUsers = Array.from(this.users.values())
      .filter((u) => (!loginSubstring || u.login.includes(loginSubstring)) && !u.isDeleted)
      .sort((a, b) => a.login.localeCompare(b.login));

    return limit ? autoSuggestUsers.slice(0, limit) : autoSuggestUsers;
  }

  create({ login, age, password }: User) {
    const user = new UserModel(login);

    Object.assign(user, { login, age, password });
    this.users.set(user.id, user);

    return user;
  }

  update(id: string, { login, age, password }: User) {
    const user = this.getById(id);

    Object.assign(user, { login, age, password });

    return user;
  }

  delete(id: string) {
    const user = this.getById(id);

    user.isDeleted = true;
  }
}

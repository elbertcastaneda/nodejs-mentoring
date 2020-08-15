import { v4 as uuid } from 'uuid';

export interface User {
  id: string;
  login: string;
  password?: string;
  age?: number;
  isDeleted: boolean;
}

export default class UserModel implements User {
  id: string;

  login: string;

  password?: string;

  age?: number;

  isDeleted = false;

  constructor(login: string, id = uuid().toUpperCase()) {
    this.login = login;
    this.id = id;
  }
}

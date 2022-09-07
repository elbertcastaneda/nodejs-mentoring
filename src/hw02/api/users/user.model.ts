import { v4 as uuid } from 'uuid';
import {
  IsAlphanumeric,
  IsDefined,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { IsUserAlreadyExist } from 'validators';

export interface User {
  id: string;
  login: string;
  password?: string;
  age?: number;
  isDeleted: boolean;
}

export default class UserModel implements User {
  @IsUUID('4')
  @IsDefined()
    id: string;

  @IsUserAlreadyExist()
  @IsDefined()
    login: string;

  @IsAlphanumeric()
  @IsDefined()
    password?: string;

  @IsDefined()
  @Min(4)
  @Max(130)
    age?: number;

  isDeleted = false;

  constructor(login = '', id = uuid().toUpperCase()) {
    this.login = login;
    this.id = id;
  }
}

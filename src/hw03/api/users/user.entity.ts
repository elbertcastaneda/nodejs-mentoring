import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import {
  IsAlphanumeric,
  IsDefined,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import IUser from './user.type';

@Entity({ name: 'users' })
export default class User extends BaseEntity implements IUser {
  @IsUUID('4')
  @IsDefined()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsDefined()
  @Column({ unique: true })
  login: string;

  @IsAlphanumeric()
  @IsDefined()
  @Column()
  password?: string;

  @IsDefined()
  @Min(4)
  @Max(130)
  @Column()
  age?: number;

  @Column('boolean', { default: false })
  isDeleted: boolean = false;

  constructor(login = '', id = uuid().toUpperCase()) {
    super();

    this.login = login;
    this.id = id;
  }
}

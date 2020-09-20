import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsAlphanumeric,
  IsDefined,
  IsUUID,
  Max,
  Min,
  validate,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { processValidationErrors } from 'api/_utils';
import Group from 'api/groups/group.entity';
import IUser from './user.type';

@Entity({ name: 'users' })
export default class User extends BaseEntity implements IUser {
  @IsUUID('4')
  @IsDefined()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsAlphanumeric()
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

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable({ name: 'groups_users' })
  readonly groups?: Group[];

  constructor(login = '', id = uuid().toUpperCase()) {
    super();

    this.login = login;
    this.id = id;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const validationErrors = await validate(this);

    processValidationErrors(validationErrors);
  }
}

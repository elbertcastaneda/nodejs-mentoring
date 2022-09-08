import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  ArrayNotEmpty,
  IsAlphanumeric,
  IsDefined,
  IsUUID,
  IsEnum,
  Length,
  validate,
} from 'class-validator';
import { v4 as uuid } from 'uuid';

import { processValidationErrors } from '_utils';

import User from 'api/users/user.entity';

import IGroup, { Permissions } from './group.type';

@Entity({ name: 'groups' })
export default class Group extends BaseEntity implements IGroup {
  @IsUUID('4')
  @IsDefined()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsDefined()
  @IsAlphanumeric()
  @Length(4, 64)
  @Column({ unique: true })
  name: string;

  @IsEnum(Permissions, {
    each: true,
    message: `each value in permissions must be a valid value (${Object.values(Permissions).join(
      '|'
    )})`,
  })
  @ArrayNotEmpty()
  @Column({
    type: 'simple-array',
    default: [Permissions.Read] as Permissions[],
  })
  permissions: Permissions[];

  @ManyToMany(() => User, (user) => user.groups, { cascade: true })
  @JoinTable({ name: 'groups_users' })
  readonly users?: User[];

  constructor(name = '', permissions = [Permissions.Read], id = uuid().toUpperCase()) {
    super();

    this.name = name;
    this.permissions = permissions;
    this.id = id;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const validationErrors = await validate(this);
    this.id = this.id.toUpperCase();

    processValidationErrors(validationErrors);
  }
}

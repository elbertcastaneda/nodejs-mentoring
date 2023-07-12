import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import {
  IsAlphanumeric,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Max,
  Min,
  Length,
} from 'class-validator';
import { v4 as uuid } from 'uuid';

import { compareHash } from '~/_utils/crypto';
import Group from '~/api/groups/group.entity';

import IUser from './user.type';

@Entity({ name: 'users' })
export default class User extends BaseEntity implements IUser {
  @IsNotEmpty()
  @IsUUID('4')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(4, 32)
  @Column({ unique: true, length: 32 })
  login: string;

  @IsNotEmpty()
  @Length(64, 64, {
    message:
      'The password is always a SHA256 hash and is generated with the field salt automatically',
  })
  @Column({ length: 64 })
  password?: string = undefined;

  @Column({ length: 257 })
  salt?: string = undefined;

  @IsDefined()
  @IsInt()
  @Min(1)
  @Max(130)
  @Column()
  age?: number = undefined;

  @CreateDateColumn()
  createdAt?: Date = undefined;

  @Column()
  createdByUserId?: string = undefined;

  @UpdateDateColumn()
  updatedAt?: Date = undefined;

  @Column()
  updatedByUserId?: string = undefined;

  @DeleteDateColumn({ nullable: true, select: false })
  deletedAt?: Date;

  @VersionColumn()
  version?: number = undefined;

  @ManyToMany(() => Group, (group) => group.users)
  @JoinTable({ name: 'groups_users' })
  readonly groups?: Group[];

  constructor(login = '', id = uuid().toUpperCase()) {
    super();

    this.login = login;
    this.id = id;
  }

  comparePassword(password: string): boolean {
    if (!this.password || !this.salt) {
      return false;
    }

    return compareHash(password, { hash: this.password as string, salt: this.salt as string });
  }
}

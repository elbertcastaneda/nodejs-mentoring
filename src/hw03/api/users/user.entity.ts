import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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
  IsUUID,
  Max,
  Min,
  Length,
  validate,
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import { processValidationErrors } from '~/_utils';
import Group from '~/api/groups/group.entity';
import IUser from './user.type';
import { compareHash } from '~/_utils/crypto';

@Entity({ name: 'users' })
export default class User extends BaseEntity implements IUser {
  @IsUUID('4')
  @IsDefined()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsAlphanumeric()
  @IsDefined()
  @Length(4, 32)
  @Column({ unique: true, length: 32 })
  login: string;

  @Column({ length: 64 })
  password?: string = undefined;

  @Column({ length: 257 })
  salt?: string = undefined;

  @IsDefined()
  @IsInt()
  @Min(4)
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

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    const validationErrors = await validate(this);
    this.id = this.id.toUpperCase();

    processValidationErrors(validationErrors);
  }

  comparePassword(password: string): boolean {
    return compareHash(password, { hash: this.password!, salt: this.salt! });
  }
}

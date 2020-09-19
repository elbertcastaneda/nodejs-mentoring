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
} from 'class-validator';
import { v4 as uuid } from 'uuid';
import IGroup from './group.type';

@Entity({ name: 'groups' })
export default class Group extends BaseEntity implements IGroup {
  @IsUUID('4')
  @IsDefined()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsDefined()
  @IsAlphanumeric()
  @Column({ unique: true })
  name: string;

  constructor(name = '', id = uuid().toUpperCase()) {
    super();

    this.name = name;
    this.id = id;
  }
}

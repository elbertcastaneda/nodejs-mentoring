import {
  BaseEntity,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import User from '~/api/users/user.entity';
import { AuthUserNotFound } from '~/errors';

import type MyBaseEntity from './MyBaseEntity';

const instanceOfMyBaseEntity = (entity: BaseEntity) =>
  'id' in entity &&
  'createdAt' in entity &&
  'createdByUserId' in entity &&
  'updatedAt' in entity &&
  'updatedByUserId' in entity;

@EventSubscriber()
export default class BaseEntitySubscriber implements EntitySubscriberInterface {
  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<BaseEntity>) {
    if (!(event.queryRunner.data instanceof User)) {
      throw new AuthUserNotFound();
    }

    if (!instanceOfMyBaseEntity(event.entity)) {
      return;
    }

    const entity = event.entity as unknown as MyBaseEntity;
    const user = event.queryRunner.data as User;

    entity.createdByUserId = user.id;
    entity.updatedByUserId = user.id;

    entity.id = entity.id || uuid().toUpperCase();
  }

  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    if (!(event.queryRunner.data instanceof User)) {
      throw new AuthUserNotFound();
    }

    if (!event.entity) {
      return;
    }

    if (
      !instanceOfMyBaseEntity(event.entity as BaseEntity) ||
      !instanceOfMyBaseEntity(event.databaseEntity)
    ) {
      return;
    }

    const entity = event.entity as MyBaseEntity;
    const dbEntity = event.databaseEntity as unknown as MyBaseEntity;
    const user = event.queryRunner.data as User;

    entity.createdByUserId = dbEntity.createdByUserId;
    entity.updatedByUserId = user.id;
  }
}

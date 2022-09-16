import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { logger } from '_utils';
import User from 'api/users/user.entity';
import MyBaseEntity from './MyBaseEntity';
import { AuthUserNotFound } from 'errors';

@EventSubscriber()
export class BaseEntitySubscriber implements EntitySubscriberInterface {
  /**
   * Called before post insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    logger.debug('Inserting: ', event.entity);
    if (!(event.queryRunner.data instanceof User)) {
      throw new AuthUserNotFound();
    }

    const entity = event.entity as MyBaseEntity;
    const user = event.queryRunner.data as User;

    entity.createdByUserId = user.id;
    entity.updatedByUserId = user.id;
  }

  /**
   * Called before entity update.
   */
  beforeUpdate(event: UpdateEvent<any>) {
    logger.debug('Updating: ', event.entity);
    if (!(event.queryRunner.data instanceof User)) {
      throw new AuthUserNotFound();
    }

    const entity = event.entity as MyBaseEntity;
    const dbEntity = event.databaseEntity as MyBaseEntity;
    const user = event.queryRunner.data as User;

    entity.createdByUserId = dbEntity.createdByUserId;
    entity.updatedByUserId = user.id;
  }
}

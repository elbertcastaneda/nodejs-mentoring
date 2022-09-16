import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';

import { generateHash } from '_utils/crypto';

import User from './user.entity';

@EventSubscriber()
export default class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return User;
  }

  /**
   * Called before user insertion.
   */
  beforeInsert(event: InsertEvent<User>): void | Promise<any> {
    const password = generateHash(event.entity.password!);

    event.entity.password = password.hash;
    event.entity.salt = password.salt;
  }

  /**
   * Called before user update.
   */
  beforeUpdate(event: UpdateEvent<User>): void | Promise<any> {
    if (event.entity && event.databaseEntity.password !== event.entity.password) {
      const password = generateHash(event.entity?.password!);

      event.entity.password = password.hash;
      event.entity.salt = password.salt;
    }
  }
}

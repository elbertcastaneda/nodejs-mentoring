import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { validate } from 'class-validator';

import { processValidationErrors } from '~/_utils';
import { generateHash } from '~/_utils/crypto';

import User from './user.entity';

@EventSubscriber()
export default class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return User;
  }

  async validate(user: User) {
    const validationErrors = await validate(user);

    processValidationErrors(validationErrors);
  }

  /**
   * Called before user insertion.
   */
  async beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password) {
      const password = generateHash(event.entity.password as string);

      event.entity.password = password.hash;
      event.entity.salt = password.salt;
    }

    await this.validate(event.entity);
  }

  /**
   * Called before user update.
   */
  async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity) {
      if (event.databaseEntity.password !== event.entity.password) {
        const password = generateHash(event.entity.password as string);

        event.entity.password = password.hash;
        event.entity.salt = password.salt;
      }

      await this.validate(event.entity as User);
    }
  }
}

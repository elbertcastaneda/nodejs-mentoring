import type { EntityTarget, Repository, ObjectLiteral } from 'typeorm';
import dataSource from 'config/typeorm.config';

export default abstract class BaseService<Entity extends ObjectLiteral> {
  protected repository: Repository<Entity>;

  constructor(entity: EntityTarget<Entity>) {
    this.repository = dataSource.getRepository(entity);
  }
}

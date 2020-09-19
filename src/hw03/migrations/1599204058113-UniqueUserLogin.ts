/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueUserLogin1599204058113 implements MigrationInterface {
  name = 'UniqueUserLogin1599204058113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "ix_users_login" UNIQUE ("login")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "ix_users_login"');
  }
}

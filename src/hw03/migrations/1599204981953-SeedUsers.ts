/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1599204981953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO "user" (login, password, age) VALUES(\'test.user1\', \'password1\', 19)');
    await queryRunner.query('INSERT INTO "user" (login, password, age) VALUES(\'test.user2\', \'password2\', 20)');
    await queryRunner.query('INSERT INTO "user" (login, password, age) VALUES(\'test.user3\', \'password3\', 21)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "user" WHERE login = \'test.user1\'');
    await queryRunner.query('DELETE FROM "user" WHERE login = \'test.user2\'');
    await queryRunner.query('DELETE FROM "user" WHERE login = \'test.user3\'');
  }
}

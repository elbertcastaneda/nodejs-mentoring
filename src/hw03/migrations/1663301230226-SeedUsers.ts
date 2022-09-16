import { MigrationInterface, QueryRunner } from 'typeorm';
import { generateHash } from '_utils/crypto';

export class SeedUsers1663301230226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const elbertHash = generateHash('mainPassword');
    await queryRunner.query(
      `INSERT INTO "users" ("login", "age", "password", "salt", "version", "createdByUserId", "updatedByUserId") VALUES('elbert', 35, '${elbertHash.hash}', '${elbertHash.salt}', 1, '-1', '-1')`
    );
    const testUser1 = generateHash('password1');
    await queryRunner.query(
      `INSERT INTO "users" ("login", "age", "password", "salt", "version", "createdByUserId", "updatedByUserId") VALUES('test.user1', 19, '${testUser1.hash}', '${testUser1.salt}', 1, '-1', '-1')`
    );
    const testUser2 = generateHash('password2');
    await queryRunner.query(
      `INSERT INTO "users" ("login", "age", "password", "salt", "version", "createdByUserId", "updatedByUserId") VALUES('test.user2', 20, '${testUser2.hash}', '${testUser2.salt}', 1, '-1', '-1')`
    );
    const testUser3 = generateHash('password1');
    await queryRunner.query(
      `INSERT INTO "users" ("login", "age", "password", "salt", "version", "createdByUserId", "updatedByUserId") VALUES('test.user3', 21, '${testUser3.hash}', '${testUser3.salt}', 1, '-1', '-1')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "users" WHERE login = \'elbert\'');
    await queryRunner.query('DELETE FROM "users" WHERE login = \'test.user1\'');
    await queryRunner.query('DELETE FROM "users" WHERE login = \'test.user2\'');
    await queryRunner.query('DELETE FROM "users" WHERE login = \'test.user3\'');
  }
}

/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGroupsUsersTableManyToMany1600566489651 implements MigrationInterface {
  name = 'AddGroupsUsersTableManyToMany1600566489651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "groups_users" ("usersId" uuid NOT NULL, "groupsId" uuid NOT NULL, CONSTRAINT "PK_10bd25838083f4753fe46e72006" PRIMARY KEY ("usersId", "groupsId"))'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_f32d831a67bbae72c89ff86754" ON "groups_users" ("usersId") '
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_75566e5bc46d9b58f93d333849" ON "groups_users" ("groupsId") '
    );
    await queryRunner.query(
      'ALTER TABLE "groups_users" ADD CONSTRAINT "FK_f32d831a67bbae72c89ff867541" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "groups_users" ADD CONSTRAINT "FK_75566e5bc46d9b58f93d3338499" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "groups_users" DROP CONSTRAINT "FK_75566e5bc46d9b58f93d3338499"'
    );
    await queryRunner.query(
      'ALTER TABLE "groups_users" DROP CONSTRAINT "FK_f32d831a67bbae72c89ff867541"'
    );
    await queryRunner.query('DROP INDEX "IDX_75566e5bc46d9b58f93d333849"');
    await queryRunner.query('DROP INDEX "IDX_f32d831a67bbae72c89ff86754"');
    await queryRunner.query('DROP TABLE "groups_users"');
  }
}

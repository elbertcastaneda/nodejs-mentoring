/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPermissionsColumnToGroups1600547397823 implements MigrationInterface {
  name = 'AddPermissionsColumnToGroups1600547397823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "groups" ALTER COLUMN "permissions" SET DEFAULT \'["READ"]\''
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "groups" ALTER COLUMN "permissions" DROP DEFAULT');
  }
}

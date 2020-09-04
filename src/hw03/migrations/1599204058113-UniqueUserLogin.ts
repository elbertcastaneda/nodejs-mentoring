/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueUserLogin1599204058113 implements MigrationInterface {
  name = 'UniqueUserLogin1599204058113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login")');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "UQ_a62473490b3e4578fd683235c5e"');
  }
}

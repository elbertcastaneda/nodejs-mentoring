import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1664666415827 implements MigrationInterface {
  name = 'Initialize1664666415827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "permissions" text NOT NULL DEFAULT '["READ"]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdByUserId" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedByUserId" character varying NOT NULL, "deletedAt" TIMESTAMP, "version" integer NOT NULL, CONSTRAINT "UQ_664ea405ae2a10c264d582ee563" UNIQUE ("name"), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(32) NOT NULL, "password" character varying(64) NOT NULL, "salt" character varying(257) NOT NULL, "age" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdByUserId" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedByUserId" character varying NOT NULL, "deletedAt" TIMESTAMP, "version" integer NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "groups_users" ("groupsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_10bd25838083f4753fe46e72006" PRIMARY KEY ("groupsId", "usersId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_75566e5bc46d9b58f93d333849" ON "groups_users" ("groupsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f32d831a67bbae72c89ff86754" ON "groups_users" ("usersId") `
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users" ADD CONSTRAINT "FK_75566e5bc46d9b58f93d3338499" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users" ADD CONSTRAINT "FK_f32d831a67bbae72c89ff867541" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups_users" DROP CONSTRAINT "FK_f32d831a67bbae72c89ff867541"`
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users" DROP CONSTRAINT "FK_75566e5bc46d9b58f93d3338499"`
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_f32d831a67bbae72c89ff86754"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_75566e5bc46d9b58f93d333849"`);
    await queryRunner.query(`DROP TABLE "groups_users"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "groups"`);
  }
}

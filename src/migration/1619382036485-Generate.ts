import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generate1619382036485 implements MigrationInterface {
  name = 'Generate1619382036485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "group" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "permissions" text NOT NULL,
                CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "age" integer NOT NULL,
                "deletedDate" TIMESTAMP,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "UserGroup" (
                "groupId" uuid NOT NULL,
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_d9e45bce314f2b14f9f2a3939ca" PRIMARY KEY ("groupId", "userId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_ec0179bbbc4551b1ac57e5fb1b" ON "UserGroup" ("groupId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_07ebdcdf94d172d763cdf7b8fd" ON "UserGroup" ("userId")
        `);
    await queryRunner.query(`
            ALTER TABLE "UserGroup"
            ADD CONSTRAINT "FK_ec0179bbbc4551b1ac57e5fb1b1" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "UserGroup"
            ADD CONSTRAINT "FK_07ebdcdf94d172d763cdf7b8fd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "UserGroup" DROP CONSTRAINT "FK_07ebdcdf94d172d763cdf7b8fd9"
        `);
    await queryRunner.query(`
            ALTER TABLE "UserGroup" DROP CONSTRAINT "FK_ec0179bbbc4551b1ac57e5fb1b1"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_07ebdcdf94d172d763cdf7b8fd"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_ec0179bbbc4551b1ac57e5fb1b"
        `);
    await queryRunner.query(`
            DROP TABLE "UserGroup"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "group"
        `);
  }
}

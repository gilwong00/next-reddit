import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostAndVotes1609578660593 implements MigrationInterface {
  name = 'AddPostAndVotes1609578660593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "votes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "username" character varying NOT NULL, "postId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "body" character varying, "username" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2d82eb2bb2ddd7a6bfac8804d8" ON "posts" ("title") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_94b56178360da19356575fc6a0" ON "posts" ("body") `
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_79326ff26ef790424d820d54a72" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "FK_b5b05adc89dda0614276a13a599" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_42377e3f89a203ca74d117e5961" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_42377e3f89a203ca74d117e5961"`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_b5b05adc89dda0614276a13a599"`
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "FK_79326ff26ef790424d820d54a72"`
    );
    await queryRunner.query(`DROP INDEX "IDX_94b56178360da19356575fc6a0"`);
    await queryRunner.query(`DROP INDEX "IDX_2d82eb2bb2ddd7a6bfac8804d8"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "votes"`);
  }
}

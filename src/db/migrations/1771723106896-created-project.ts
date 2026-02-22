import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedProject1771723106896 implements MigrationInterface {
  name = 'CreatedProject1771723106896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "description" text, "budget" numeric(10,2) NOT NULL DEFAULT '0', "status" character varying(50) NOT NULL DEFAULT 'pending', "deadline" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedProduction1771724140265 implements MigrationInterface {
    name = 'CreatedProduction1771724140265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(150) NOT NULL, "description" text, "budget" numeric(10,2) NOT NULL DEFAULT '0', "status" character varying(50) NOT NULL DEFAULT 'pending', "deadline" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "productions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(100) NOT NULL, "cost" numeric(10,2) NOT NULL DEFAULT '0', "startDate" TIMESTAMP, "endDate" TIMESTAMP, "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_395fda0b6f26cb5fd9a2aa6315c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "productions"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}

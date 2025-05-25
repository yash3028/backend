import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748173965557 implements MigrationInterface {
    name = 'Init1748173965557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "software" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "accesslevels" text NOT NULL, CONSTRAINT "PK_3ceec82cc90b32643b07e8d9841" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request" ("id" SERIAL NOT NULL, "accessType" character varying NOT NULL, "reason" text NOT NULL, "status" character varying NOT NULL, "userId" integer, "softwareId" integer, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_38554ade327a061ba620eee948b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_1c740472070e3bd7aed5b0f46e7" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_1c740472070e3bd7aed5b0f46e7"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_38554ade327a061ba620eee948b"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TABLE "software"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

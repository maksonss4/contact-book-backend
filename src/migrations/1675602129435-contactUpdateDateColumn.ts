import { MigrationInterface, QueryRunner } from "typeorm";

export class contactUpdateDateColumn1675602129435 implements MigrationInterface {
    name = 'contactUpdateDateColumn1675602129435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "updated_at"`);
    }

}

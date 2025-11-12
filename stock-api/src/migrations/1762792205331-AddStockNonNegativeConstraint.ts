import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockNonNegativeConstraint1762792205331 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products
      ADD CONSTRAINT stock_non_negative CHECK (stock >= 0);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products
      DROP CONSTRAINT stock_non_negative;
    `);
  }

}

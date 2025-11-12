import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1762783923592 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "stock",
            type: "int",
            isNullable: false,
            default: 0,
          },
          {
            name: "version",
            type: "int",
            isNullable: false,
            default: 0,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
  
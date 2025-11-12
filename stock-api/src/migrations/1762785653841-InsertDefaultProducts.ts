import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDefaultProducts1762785653841 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO products (name, stock, version) VALUES
      ('Produto 1', 100, 0),
      ('Produto 2', 200, 0),
      ('Produto 3', 50, 0),
      ('Produto 4', 75, 0),
      ('Produto 5', 30, 0),
      ('Produto 6', 120, 0),
      ('Produto 7', 90, 0),
      ('Produto 8', 60, 0),
      ('Produto 9', 15, 0),
      ('Produto 10', 300, 0),
      ('Produto 11', 180, 0),
      ('Produto 12', 45, 0),
      ('Produto 13', 85, 0),
      ('Produto 14', 200, 0),
      ('Produto 15', 40, 0),
      ('Produto 16', 75, 0),
      ('Produto 17', 20, 0),
      ('Produto 18', 95, 0),
      ('Produto 19', 140, 0),
      ('Produto 20', 10, 0),
      ('Produto 21', 230, 0),
      ('Produto 22', 48, 0),
      ('Produto 23', 19, 0),
      ('Produto 24', 260, 0),
      ('Produto 25', 33, 0),
      ('Produto 26', 52, 0),
      ('Produto 27', 76, 0),
      ('Produto 28', 111, 0),
      ('Produto 29', 27, 0),
      ('Produto 30', 250, 0),
      ('Produto 31', 60, 0),
      ('Produto 32', 5, 0),
      ('Produto 33', 180, 0),
      ('Produto 34', 95, 0),
      ('Produto 35', 120, 0),
      ('Produto 36', 55, 0),
      ('Produto 37', 200, 0),
      ('Produto 38', 130, 0),
      ('Produto 39', 66, 0),
      ('Produto 40', 44, 0),
      ('Produto 41', 12, 0),
      ('Produto 42', 18, 0),
      ('Produto 43', 222, 0),
      ('Produto 44', 170, 0),
      ('Produto 45', 91, 0),
      ('Produto 46', 47, 0),
      ('Produto 47', 73, 0),
      ('Produto 48', 260, 0),
      ('Produto 49', 38, 0),
      ('Produto 50', 140, 0);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM products
      WHERE name IN (
        ${Array.from({ length: 50 }, (_, i) => `'Produto ${i + 1}'`).join(", ")}
      );
    `);
  }
}
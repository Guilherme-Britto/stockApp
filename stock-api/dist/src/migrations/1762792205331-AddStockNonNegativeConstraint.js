"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStockNonNegativeConstraint1762792205331 = void 0;
class AddStockNonNegativeConstraint1762792205331 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE products
      ADD CONSTRAINT stock_non_negative CHECK (stock >= 0);
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE products
      DROP CONSTRAINT stock_non_negative;
    `);
    }
}
exports.AddStockNonNegativeConstraint1762792205331 = AddStockNonNegativeConstraint1762792205331;
//# sourceMappingURL=1762792205331-AddStockNonNegativeConstraint.js.map
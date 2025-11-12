"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrders1762784081990 = void 0;
const typeorm_1 = require("typeorm");
class CreateOrders1762784081990 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "orders",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "product_id",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "quantity",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }));
        await queryRunner.createForeignKey("orders", new typeorm_1.TableForeignKey({
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "products",
            onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("orders");
    }
}
exports.CreateOrders1762784081990 = CreateOrders1762784081990;
//# sourceMappingURL=1762784081990-CreateOrders.js.map
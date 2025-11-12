"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProducts1762783923592 = void 0;
const typeorm_1 = require("typeorm");
class CreateProducts1762783923592 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("products");
    }
}
exports.CreateProducts1762783923592 = CreateProducts1762783923592;
//# sourceMappingURL=1762783923592-CreateProducts.js.map
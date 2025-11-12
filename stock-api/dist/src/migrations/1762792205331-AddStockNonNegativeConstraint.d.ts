import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddStockNonNegativeConstraint1762792205331 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

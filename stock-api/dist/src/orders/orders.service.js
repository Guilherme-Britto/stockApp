"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const product_entity_1 = require("../entities/product.entity");
let OrdersService = class OrdersService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async listOrders(page, limit) {
        const skip = (page - 1) * limit;
        const orderRepo = this.dataSource.getRepository(order_entity_1.Order);
        const [data, total] = await orderRepo.findAndCount({
            relations: ['product'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async createOrder(dto) {
        const { productId, quantity } = dto;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const product = await queryRunner.manager
                .getRepository(product_entity_1.Product)
                .createQueryBuilder("product")
                .setLock("pessimistic_write")
                .where("product.id = :id", { id: productId })
                .getOne();
            if (!product)
                throw new common_1.NotFoundException('Produto não encontrado');
            if (product.stock < quantity) {
                throw new common_1.ConflictException('Estoque insuficiente');
            }
            product.stock -= quantity;
            await queryRunner.manager.save(product);
            const order = queryRunner.manager.create(order_entity_1.Order, { product, quantity });
            const savedOrder = await queryRunner.manager.save(order);
            await queryRunner.commitTransaction();
            return {
                orderId: savedOrder.id,
                product: product.name,
                quantity: savedOrder.quantity,
                remainingStock: product.stock
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
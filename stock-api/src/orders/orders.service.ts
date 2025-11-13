import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  private queue: (() => Promise<void>)[] = [];
  private processing = false;
  async listOrders(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const orderRepo = this.dataSource.getRepository(Order);

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
  async createOrder(dto: CreateOrderDto) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await this.processOrder(dto);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });

      if (!this.processing) {
        this.processNext();
      }
    });
  }

  private async processNext() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const nextJob = this.queue.shift();
    if (nextJob) {
      await nextJob().catch(console.error);
    }

    this.processNext();
  }

  private async processOrder(dto: CreateOrderDto) {
    const { productId, quantity } = dto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await queryRunner.manager
        .getRepository(Product)
        .createQueryBuilder('product')
        .setLock('pessimistic_write')
        .where('product.id = :id', { id: productId })
        .getOne();

      if (!product) throw new NotFoundException('Product not found');

      if (product.stock < quantity) {
        throw new ConflictException('Insufficient stock');
      }

      product.stock -= quantity;
      await queryRunner.manager.save(product);

      const order = queryRunner.manager.create(Order, { product, quantity });
      const savedOrder = await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();

      return {
        orderId: savedOrder.id,
        product: product.name,
        quantity: savedOrder.quantity,
        remainingStock: product.stock,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

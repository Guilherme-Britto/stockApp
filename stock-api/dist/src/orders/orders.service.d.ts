import { DataSource } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '../entities/order.entity';
export declare class OrdersService {
    private dataSource;
    constructor(dataSource: DataSource);
    listOrders(page: number, limit: number): Promise<{
        data: Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    createOrder(dto: CreateOrderDto): Promise<{
        orderId: number;
        product: string;
        quantity: number;
        remainingStock: number;
    }>;
}

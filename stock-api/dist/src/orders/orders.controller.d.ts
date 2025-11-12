import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    list(page?: number, limit?: number): Promise<{
        data: import("../entities/order.entity").Order[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    create(dto: CreateOrderDto): Promise<{
        orderId: number;
        product: string;
        quantity: number;
        remainingStock: number;
    }>;
}

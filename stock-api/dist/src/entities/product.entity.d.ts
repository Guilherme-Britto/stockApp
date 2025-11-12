import { Order } from './order.entity';
export declare class Product {
    id: number;
    name: string;
    stock: number;
    version: number;
    orders: Order[];
}

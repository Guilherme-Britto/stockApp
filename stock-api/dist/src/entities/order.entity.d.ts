import { Product } from './product.entity';
export declare class Order {
    id: number;
    product: Product;
    quantity: number;
    createdAt: Date;
}

import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
export declare class ProductsService {
    private readonly productsRepo;
    constructor(productsRepo: Repository<Product>);
    findAll(page: number, limit: number): Promise<{
        data: Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<Product>;
}

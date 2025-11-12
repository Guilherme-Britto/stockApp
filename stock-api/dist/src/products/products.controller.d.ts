import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    list(page?: number, limit?: number): Promise<{
        data: import("../entities/product.entity").Product[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    get(id: number): Promise<import("../entities/product.entity").Product>;
}

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const productEntity = { id: 1, name: 'Produto Teste', stock: 10 };

  const mockProductsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  describe('list', () => {
    it('deve retornar a lista de produtos', async () => {
      mockProductsService.findAll.mockResolvedValue([productEntity]);

      const result = await controller.list();

      expect(result).toEqual([productEntity]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('get', () => {
    it('deve retornar um produto pelo ID', async () => {
      mockProductsService.findOne.mockResolvedValue(productEntity);

      const result = await controller.get(1);

      expect(result).toEqual(productEntity);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('deve repassar a exceção se o produto não existir', async () => {
      mockProductsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.get(999)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });
});

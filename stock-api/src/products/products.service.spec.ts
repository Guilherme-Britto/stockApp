import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const productEntity = { id: 1, name: 'Produto Teste', stock: 10 } as Product;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar lista paginada de produtos', async () => {
      const page = 1;
      const limit = 10;
      const total = 1;

      mockRepository.findAndCount = jest.fn().mockResolvedValue([[productEntity], total]);

      const result = await service.findAll(page, limit);

      expect(result).toEqual({
        data: [productEntity],
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });

      expect(mockRepository.findAndCount).toHaveBeenCalledTimes(1);
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: limit,
        order: { id: 'ASC' },
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar um produto pelo ID', async () => {
      mockRepository.findOne.mockResolvedValue(productEntity);

      const result = await service.findOne(1);

      expect(result).toEqual(productEntity);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve lançar NotFoundException se o produto não existir', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

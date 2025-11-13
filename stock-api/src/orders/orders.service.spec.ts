import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { DataSource } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let mockQueryRunner;
  let mockDataSource;

  beforeEach(async () => {
    mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        getRepository: jest.fn(),
        save: jest.fn(),
        create: jest.fn()
      }
    };

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner)
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: DataSource,
          useValue: mockDataSource
        }
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  describe('createOrder', () => {
    it('should create order successfully', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        stock: 10
      };

      const mockCreateQueryBuilder = {
        setLock: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockProduct)
      };

      mockQueryRunner.manager.getRepository = jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue(mockCreateQueryBuilder)
      });

      mockQueryRunner.manager.save
        .mockResolvedValueOnce({ ...mockProduct, stock: 8 })
        .mockResolvedValueOnce({ id: 1, product: mockProduct, quantity: 2 });

      const result = await service.createOrder({ productId: 1, quantity: 2 });

      expect(mockCreateQueryBuilder.setLock).toHaveBeenCalledWith('pessimistic_write');
      expect(mockProduct.stock).toBe(8);

      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.rollbackTransaction).not.toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();

      expect(result).toEqual({
        orderId: 1,
        product: 'Test Product',
        quantity: 2,
        remainingStock: 8
      });
    });

    it('should throw NotFoundException when product not found', async () => {
      const mockCreateQueryBuilder = {
        setLock: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null)
      };

      mockQueryRunner.manager.getRepository = jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue(mockCreateQueryBuilder)
      });

      await expect(service.createOrder({ productId: 1, quantity: 2 }))
        .rejects.toThrow(NotFoundException);
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    });

    it('should throw ConflictException when insufficient stock', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        stock: 1
      };

      const mockCreateQueryBuilder = {
        setLock: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockProduct)
      };

      mockQueryRunner.manager.getRepository = jest.fn().mockReturnValue({
        createQueryBuilder: jest.fn().mockReturnValue(mockCreateQueryBuilder)
      });

      await expect(service.createOrder({ productId: 1, quantity: 2 }))
        .rejects.toThrow(ConflictException);
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    });

  });
});
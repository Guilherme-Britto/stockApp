import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const mockOrdersService = {
      listOrders: jest.fn(),
      createOrder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  describe('list', () => {
    it('should return paginated orders from OrdersService.listOrders', async () => {
      const mockOrders = [
        {
          id: 1,
          product: { id: 1, name: 'Test', stock: 10, version: 1, orders: [] },
          quantity: 3,
          createdAt: new Date(),
        },
        {
          id: 2,
          product: { id: 2, name: 'Another', stock: 5, version: 1, orders: [] },
          quantity: 5,
          createdAt: new Date(),
        }
      ];

      const page = 1;
      const limit = 10;

      const mockPaginatedResponse = {
        data: mockOrders,
        total: mockOrders.length,
        page,
        limit,
        totalPages: 1,
      };

      jest.spyOn(service, 'listOrders').mockResolvedValue(mockPaginatedResponse);

      const result = await controller.list(page, limit);

      expect(service.listOrders).toHaveBeenCalledWith(page, limit);
      expect(result).toEqual(mockPaginatedResponse);
    });
  });

  describe('create', () => {
    it('should call OrdersService.createOrder with correct payload', async () => {
      const dto: CreateOrderDto = {
        productId: 1,
        quantity: 2,
      };

      const mockResponse = {
        orderId: 10,
        product: 'Test Product',
        quantity: 2,
        remainingStock: 8,
      };

      jest.spyOn(service, 'createOrder').mockResolvedValue(mockResponse);

      const result = await controller.create(dto);

      expect(service.createOrder).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });
});

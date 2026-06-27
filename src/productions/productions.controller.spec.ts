import { Test, TestingModule } from '@nestjs/testing';
import { ProductionsController } from './productions.controller';
import { ProductionsService } from './productions.service';

describe('ProductionsController', () => {
  let controller: ProductionsController;

  const mockProductionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionsController],
      providers: [
        {
          provide: ProductionsService,
          useValue: mockProductionsService,
        },
      ],
    }).compile();

    controller = module.get<ProductionsController>(ProductionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

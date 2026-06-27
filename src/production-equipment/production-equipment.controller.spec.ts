import { Test, TestingModule } from '@nestjs/testing';
import { ProductionEquipmentsController } from './production-equipment.controller';
import { ProductionEquipmentsService } from './production-equipment.service';

describe('ProductionEquipmentsController', () => {
  let controller: ProductionEquipmentsController;

  const mockProductionEquipmentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    checkAvailability: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionEquipmentsController],
      providers: [
        {
          provide: ProductionEquipmentsService,
          useValue: mockProductionEquipmentsService,
        },
      ],
    }).compile();

    controller = module.get<ProductionEquipmentsController>(
      ProductionEquipmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

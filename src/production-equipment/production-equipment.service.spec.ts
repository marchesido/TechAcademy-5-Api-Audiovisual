import { Test, TestingModule } from '@nestjs/testing';
import { ProductionEquipmentsService } from './production-equipment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductionEquipment } from './entities/production-equipment.entity';

describe('ProductionEquipmentsService', () => {
  let service: ProductionEquipmentsService;

  const mockProductionEquipmentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(0),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionEquipmentsService,
        {
          provide: getRepositoryToken(ProductionEquipment),
          useValue: mockProductionEquipmentRepository,
        },
      ],
    }).compile();

    service = module.get<ProductionEquipmentsService>(
      ProductionEquipmentsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

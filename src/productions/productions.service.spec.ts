import { Test, TestingModule } from '@nestjs/testing';
import { ProductionsService } from './productions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Production } from './entities/production.entity';
import { ProductionEquipment } from '../production-equipment/entities/production-equipment.entity';
import { DataSource } from 'typeorm';

describe('ProductionsService', () => {
  let service: ProductionsService;

  const mockProductionRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  const mockProductionEquipmentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  const mockDataSource = {
    createQueryRunner: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionsService,
        {
          provide: getRepositoryToken(Production),
          useValue: mockProductionRepository,
        },
        {
          provide: getRepositoryToken(ProductionEquipment),
          useValue: mockProductionEquipmentRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ProductionsService>(ProductionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

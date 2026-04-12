import { Test, TestingModule } from '@nestjs/testing';
import { ProductionEquipmentService } from './production-equipment.service';

describe('ProductionEquipmentService', () => {
  let service: ProductionEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionEquipmentService],
    }).compile();

    service = module.get<ProductionEquipmentService>(ProductionEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

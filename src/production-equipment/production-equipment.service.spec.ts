import { Test, TestingModule } from '@nestjs/testing';
import { ProductionEquipmentsService } from './production-equipment.service';

describe('ProductionEquipmentsService', () => {
  let service: ProductionEquipmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionEquipmentsService],
    }).compile();

    service = module.get<ProductionEquipmentsService>(
      ProductionEquipmentsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductionEquipmentController } from './production-equipment.controller';
import { ProductionEquipmentService } from './production-equipment.service';

describe('ProductionEquipmentController', () => {
  let controller: ProductionEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionEquipmentController],
      providers: [ProductionEquipmentService],
    }).compile();

    controller = module.get<ProductionEquipmentController>(ProductionEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

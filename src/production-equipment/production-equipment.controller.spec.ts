import { Test, TestingModule } from '@nestjs/testing';
import { ProductionEquipmentsController } from './production-equipment.controller';
import { ProductionEquipmentsService } from './production-equipment.service';

describe('ProductionEquipmentsController', () => {
  let controller: ProductionEquipmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionEquipmentsController],
      providers: [ProductionEquipmentsService],
    }).compile();

    controller = module.get<ProductionEquipmentsController>(
      ProductionEquipmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

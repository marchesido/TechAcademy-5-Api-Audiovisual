import { Test, TestingModule } from '@nestjs/testing';
import { ProjectEquipmentsController } from './project-equipments.controller';
import { ProjectEquipmentsService } from './project-equipments.service';

describe('ProjectEquipmentsController', () => {
  let controller: ProjectEquipmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectEquipmentsController],
      providers: [ProjectEquipmentsService],
    }).compile();

    controller = module.get<ProjectEquipmentsController>(
      ProjectEquipmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

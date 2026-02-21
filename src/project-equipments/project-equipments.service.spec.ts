import { Test, TestingModule } from '@nestjs/testing';
import { ProjectEquipmentsService } from './project-equipments.service';

describe('ProjectEquipmentsService', () => {
  let service: ProjectEquipmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectEquipmentsService],
    }).compile();

    service = module.get<ProjectEquipmentsService>(ProjectEquipmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

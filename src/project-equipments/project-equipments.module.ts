import { Module } from '@nestjs/common';
import { ProjectEquipmentsService } from './project-equipments.service';
import { ProjectEquipmentsController } from './project-equipments.controller';

@Module({
  controllers: [ProjectEquipmentsController],
  providers: [ProjectEquipmentsService],
})
export class ProjectEquipmentsModule {}

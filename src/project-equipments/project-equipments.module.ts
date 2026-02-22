import { Module } from '@nestjs/common';
import { ProjectEquipmentsService } from './project-equipments.service';
import { ProjectEquipmentsController } from './project-equipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEquipment } from './entities/project-equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEquipment])],
  controllers: [ProjectEquipmentsController],
  providers: [ProjectEquipmentsService],
})
export class ProjectEquipmentsModule {}

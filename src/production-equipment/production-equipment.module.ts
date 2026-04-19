import { Module } from '@nestjs/common';
import { ProductionEquipmentsService } from './production-equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionEquipment } from './entities/production-equipment.entity';
import { ProductionEquipmentsController } from './production-equipment.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProductionEquipment])],
  controllers: [ProductionEquipmentsController],
  providers: [ProductionEquipmentsService],
})
export class ProductionEquipmentModule {}

import { Module } from '@nestjs/common';
import { ProductionEquipmentController } from './production-equipment.controller';
import { ProductionEquipmentsService } from './production-equipment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionEquipment } from './entities/production-equipment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductionEquipment])],
  controllers: [ProductionEquipmentController],
  providers: [ProductionEquipmentsService],
})
export class ProductionEquipmentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsService } from './seeds.service';
import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import { Project } from '../../projects/entities/project.entity';
import { Equipment } from '../../equipments/entities/equipment.entity';
import { Production } from '../../productions/entities/production.entity';
import { ProductionEquipment } from '../../production-equipment/entities/production-equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Client,
      Project,
      Equipment,
      Production,
      ProductionEquipment,
    ]),
  ],
  providers: [SeedsService],
})
export class SeedsModule {}

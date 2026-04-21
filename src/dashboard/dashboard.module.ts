import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Client } from '../clients/entities/client.entity';
import { Project } from '../projects/entities/project.entity';
import { Production } from '../productions/entities/production.entity';
import { Equipment } from '../equipments/entities/equipment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Project, Production, Equipment]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

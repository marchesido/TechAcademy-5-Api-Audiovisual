import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/entities/client.entity';
import { Project } from '../projects/entities/project.entity';
import { Production } from '../productions/entities/production.entity';
import { Equipment } from '../equipments/entities/equipment.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async getStats() {
    const clientsCount = await this.clientRepository.count();
    const projectsCount = await this.projectRepository.count();
    const productionsCount = await this.productionRepository.count();
    const equipmentsCount = await this.equipmentRepository.count();

    return {
      clients: clientsCount,
      projects: projectsCount,
      productions: productionsCount,
      equipments: equipmentsCount,
    };
  }
}

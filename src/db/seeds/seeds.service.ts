import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import { Project } from '../../projects/entities/project.entity';
import { Equipment } from '../../equipments/entities/equipment.entity';
import { Production } from '../../productions/entities/production.entity';
import { ProductionEquipment } from '../../production-equipment/entities/production-equipment.entity';

@Injectable()
export class SeedsService implements OnModuleInit {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Equipment) private equipmentRepository: Repository<Equipment>,
    @InjectRepository(Production) private productionRepository: Repository<Production>,
    @InjectRepository(ProductionEquipment) private productionEquipmentRepository: Repository<ProductionEquipment>,
  ) {}

  async onModuleInit() {
    this.logger.log('Iniciando seeding automático...');
    try {
      await this.runSeed();
      this.logger.log('Seeding concluído com sucesso!');
    } catch (error) {
      this.logger.error('Erro ao executar seeding:', error);
    }
  }

  async runSeed() {
    this.logger.log('Limpando dados existentes...');
    
    // Deletar em ordem para evitar violação de chaves estrangeiras
    await this.productionEquipmentRepository.createQueryBuilder().delete().execute();
    await this.productionRepository.createQueryBuilder().delete().execute();
    await this.projectRepository.createQueryBuilder().delete().execute();
    await this.equipmentRepository.createQueryBuilder().delete().execute();
    await this.clientRepository.createQueryBuilder().delete().execute();
    await this.userRepository.createQueryBuilder().delete().execute();

    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const userPasswordHash = await bcrypt.hash('password123', 10);

    // Users
    this.logger.log('Semeando usuários...');
    const users: User[] = [];
    for (let i = 1; i <= 7; i++) {
      const isAdmin = i === 1;
      const user = this.userRepository.create({
        name: isAdmin ? 'Administrador Padrão' : `User ${i}`,
        email: isAdmin ? 'admin@example.com' : `user${i}@example.com`,
        cpf: `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`.substring(0, 11),
        passwordHash: isAdmin ? adminPasswordHash : userPasswordHash,
        role: isAdmin ? UserRole.ADMIN : UserRole.USER,
      });
      users.push(await this.userRepository.save(user));
    }

    // Clients
    this.logger.log('Semeando clientes...');
    const clients: Client[] = [];
    for (let i = 1; i <= 7; i++) {
      const client = this.clientRepository.create({
        name: `Client ${i}`,
        email: `client${i}@company.com`,
        phone: `(11) 99999-000${i}`,
        cpf: `${i}234567890${i}`.substring(0, 11),
        company: `Company ${i} Ltd`,
      });
      clients.push(await this.clientRepository.save(client));
    }

    // Projects
    this.logger.log('Semeando projetos...');
    const projects: Project[] = [];
    for (let i = 1; i <= 7; i++) {
      const project = this.projectRepository.create({
        title: `Project ${i}`,
        description: `Description for project ${i}`,
        budget: 1000 * i,
        status: 'pending',
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        client: clients[i - 1],
      });
      projects.push(await this.projectRepository.save(project));
    }

    // Equipments
    this.logger.log('Semeando equipamentos...');
    const equipments: Equipment[] = [];
    for (let i = 1; i <= 7; i++) {
      const equipment = this.equipmentRepository.create({
        name: `Equipment ${i}`,
        category: i % 2 === 0 ? 'Camera' : 'Lighting',
        serialNumber: `SN-00${i}`,
        purchaseDate: new Date(),
        status: 'available',
        dailyCost: 50 * i,
      });
      equipments.push(await this.equipmentRepository.save(equipment));
    }

    // Productions
    this.logger.log('Semeando produções...');
    const productions: Production[] = [];
    for (let i = 1; i <= 7; i++) {
      const production = this.productionRepository.create({
        type: i % 2 === 0 ? 'Filming' : 'Setup',
        cost: 500 * i,
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        notes: `Notes for production ${i}`,
        project: projects[i - 1],
      });
      productions.push(await this.productionRepository.save(production));
    }

    // ProductionEquipment
    this.logger.log('Semeando relações produção-equipamento...');
    for (let i = 1; i <= 7; i++) {
      const pe = this.productionEquipmentRepository.create({
        quantity: 1,
        usageDate: new Date(),
        customDailyCost: equipments[i - 1].dailyCost,
        productionId: productions[i - 1].id,
        equipmentId: equipments[i - 1].id,
      });
      await this.productionEquipmentRepository.save(pe);
    }
  }
}

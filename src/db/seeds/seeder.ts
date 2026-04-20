import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import AppDataSource from '../../config/typeorm.config';
import { User, UserRole } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import { Project } from '../../projects/entities/project.entity';
import { Equipment } from '../../equipments/entities/equipment.entity';
import { Production } from '../../productions/entities/production.entity';
import { ProductionEquipment } from '../../production-equipment/entities/production-equipment.entity';

async function seed() {
  console.log('Initializing database connection...');
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const clientRepository = AppDataSource.getRepository(Client);
  const projectRepository = AppDataSource.getRepository(Project);
  const equipmentRepository = AppDataSource.getRepository(Equipment);
  const productionRepository = AppDataSource.getRepository(Production);
  const productionEquipmentRepository = AppDataSource.getRepository(ProductionEquipment);

  console.log('Clearing existing data...');
  // Delete in order to avoid foreign key violations
  await productionEquipmentRepository.createQueryBuilder().delete().execute();
  await productionRepository.createQueryBuilder().delete().execute();
  await projectRepository.createQueryBuilder().delete().execute();
  await equipmentRepository.createQueryBuilder().delete().execute();
  await clientRepository.createQueryBuilder().delete().execute();
  await userRepository.createQueryBuilder().delete().execute();

  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const userPasswordHash = await bcrypt.hash('password123', 10);

  // Users
  console.log('Seeding users...');
  const users: User[] = [];
  for (let i = 1; i <= 7; i++) {
    const isAdmin = i === 1;
    const user = userRepository.create({
      name: isAdmin ? 'Administrador Padrão' : `User ${i}`,
      email: isAdmin ? 'admin@example.com' : `user${i}@example.com`,
      cpf: `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`.substring(0, 11),
      passwordHash: isAdmin ? adminPasswordHash : userPasswordHash,
      role: isAdmin ? UserRole.ADMIN : UserRole.USER,
    });
    users.push(await userRepository.save(user));
  }
  console.log('Seeded 7 users');

  // Clients
  console.log('Seeding clients...');
  const clients: Client[] = [];
  for (let i = 1; i <= 7; i++) {
    const client = clientRepository.create({
      name: `Client ${i}`,
      email: `client${i}@company.com`,
      phone: `(11) 99999-000${i}`,
      cpf: `${i}234567890${i}`.substring(0, 11),
      company: `Company ${i} Ltd`,
    });
    clients.push(await clientRepository.save(client));
  }
  console.log('Seeded 7 clients');

  // Projects
  console.log('Seeding projects...');
  const projects: Project[] = [];
  for (let i = 1; i <= 7; i++) {
    const project = projectRepository.create({
      title: `Project ${i}`,
      description: `Description for project ${i}`,
      budget: 1000 * i,
      status: 'pending',
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
      client: clients[i - 1],
    });
    projects.push(await projectRepository.save(project));
  }
  console.log('Seeded 7 projects');

  // Equipments
  console.log('Seeding equipments...');
  const equipments: Equipment[] = [];
  for (let i = 1; i <= 7; i++) {
    const equipment = equipmentRepository.create({
      name: `Equipment ${i}`,
      category: i % 2 === 0 ? 'Camera' : 'Lighting',
      serialNumber: `SN-00${i}`,
      purchaseDate: new Date(),
      status: 'available',
      dailyCost: 50 * i,
    });
    equipments.push(await equipmentRepository.save(equipment));
  }
  console.log('Seeded 7 equipments');

  // Productions
  console.log('Seeding productions...');
  const productions: Production[] = [];
  for (let i = 1; i <= 7; i++) {
    const production = productionRepository.create({
      type: i % 2 === 0 ? 'Filming' : 'Setup',
      cost: 500 * i,
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      notes: `Notes for production ${i}`,
      project: projects[i - 1],
    });
    productions.push(await productionRepository.save(production));
  }
  console.log('Seeded 7 productions');

  // ProductionEquipment
  console.log('Seeding production-equipment relations...');
  for (let i = 1; i <= 7; i++) {
    const pe = productionEquipmentRepository.create({
      quantity: 1,
      usageDate: new Date(),
      customDailyCost: equipments[i - 1].dailyCost,
      productionId: productions[i - 1].id,
      equipmentId: equipments[i - 1].id,
    });
    await productionEquipmentRepository.save(pe);
  }
  console.log('Seeded 7 production-equipment relations');

  await AppDataSource.destroy();
  console.log('Seeding completed successfully!');
}

seed().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});

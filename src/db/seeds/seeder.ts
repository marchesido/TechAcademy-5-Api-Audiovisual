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

  try {
    const userRepository = AppDataSource.getRepository(User);
    const clientRepository = AppDataSource.getRepository(Client);
    const projectRepository = AppDataSource.getRepository(Project);
    const equipmentRepository = AppDataSource.getRepository(Equipment);
    const productionRepository = AppDataSource.getRepository(Production);
    const productionEquipmentRepository =
      AppDataSource.getRepository(ProductionEquipment);

    // Verifica se o banco já foi populado
    const existingUsers = await userRepository.count();

    if (existingUsers > 0) {
      console.log(
        `Database already seeded (${existingUsers} users found). Skipping seed.`,
      );
      return;
    }

    console.log('Starting seed...');

    const adminPasswordHash = await bcrypt.hash('admin123', 10);
    const userPasswordHash = await bcrypt.hash('password123', 10);

    // USERS
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

    console.log(`Seeded ${users.length} users`);

    // CLIENTS
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

    console.log(`Seeded ${clients.length} clients`);

    // PROJECTS
    console.log('Seeding projects...');
    const projects: Project[] = [];

    for (let i = 1; i <= 7; i++) {
      const project = projectRepository.create({
        title: `Project ${i}`,
        description: `Description for project ${i}`,
        budget: 1000 * i,
        status: 'pending',
        deadline: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 30,
        ),
        client: clients[i - 1],
      });

      projects.push(await projectRepository.save(project));
    }

    console.log(`Seeded ${projects.length} projects`);

    // EQUIPMENTS
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

    console.log(`Seeded ${equipments.length} equipments`);

    // PRODUCTIONS
    console.log('Seeding productions...');
    const productions: Production[] = [];

    for (let i = 1; i <= 7; i++) {
      const production = productionRepository.create({
        type: i % 2 === 0 ? 'Filming' : 'Setup',
        cost: 500 * i,
        startDate: new Date(),
        endDate: new Date(
          Date.now() + 1000 * 60 * 60 * 24,
        ),
        notes: `Notes for production ${i}`,
        project: projects[i - 1],
      });

      productions.push(await productionRepository.save(production));
    }

    console.log(`Seeded ${productions.length} productions`);

    // PRODUCTION EQUIPMENT
    console.log('Seeding production-equipment relations...');

    for (let i = 1; i <= 7; i++) {
      const relation = productionEquipmentRepository.create({
        quantity: 1,
        usageDate: new Date(),
        customDailyCost: equipments[i - 1].dailyCost,
        productionId: productions[i - 1].id,
        equipmentId: equipments[i - 1].id,
      });

      await productionEquipmentRepository.save(relation);
    }

    console.log('Seeded 7 production-equipment relations');
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

//seed()
//.then(() => process.exit(0))
//.catch(() => process.exit(1));
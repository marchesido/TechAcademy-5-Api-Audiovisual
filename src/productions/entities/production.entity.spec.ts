import { Production } from './production.entity';
import { Project } from '../../projects/entities/project.entity';
import { ProductionEquipment } from '../../production-equipment/entities/production-equipment.entity';

describe('ProductionEntity', () => {
  it('should create a Production entity', () => {
    const production = new Production();
    production.id = 'uuid';
    production.type = 'Type 1';
    production.cost = 500;
    production.startDate = new Date();
    production.endDate = new Date();
    production.notes = 'Note';
    production.createdAt = new Date();
    production.project = new Project();
    production.productionEquipments = [new ProductionEquipment()];

    expect(production).toBeDefined();
    expect(production.type).toBe('Type 1');
    expect(production.cost).toBe(500);
  });
});

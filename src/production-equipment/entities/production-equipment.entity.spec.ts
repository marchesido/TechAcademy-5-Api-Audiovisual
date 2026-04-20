import { ProductionEquipment } from './production-equipment.entity';
import { Production } from '../../productions/entities/production.entity';
import { Equipment } from '../../equipments/entities/equipment.entity';

describe('ProductionEquipmentEntity', () => {
  it('should create a ProductionEquipment entity', () => {
    const pe = new ProductionEquipment();
    pe.id = 'uuid';
    pe.quantity = 2;
    pe.usageDate = new Date();
    pe.customDailyCost = 90;
    pe.createdAt = new Date();
    pe.productionId = 'prod-uuid';
    pe.equipmentId = 'equip-uuid';
    pe.production = new Production();
    pe.equipment = new Equipment();

    expect(pe).toBeDefined();
    expect(pe.quantity).toBe(2);
    expect(pe.customDailyCost).toBe(90);
  });
});

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductionEquipmentDto } from './dto/create-production-equipment.dto';
import { UpdateProductionEquipmentDto } from './dto/update-production-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionEquipment } from './entities/production-equipment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductionEquipmentsService {

  constructor(
        @InjectRepository(ProductionEquipment)
        private readonly repository: Repository<ProductionEquipment>,
      ) {}

  async create(createProductionEquipmentDto: CreateProductionEquipmentDto) {
    const { productionId, equipmentId, ...rest } = createProductionEquipmentDto;
    
    // Verificando duplicação antes de salvar ou via try/catch na hora do save
    const existing = await this.repository.findOne({
      where: {
        equipment: { id: equipmentId },
        usageDate: rest.usageDate
      }
    });

    if (existing) {
      throw new ConflictException('Este equipamento já está agendado nesta data.');
    }

    const productionEquipment = this.repository.create({
      ...rest,
      production: { id: productionId } as any,
      equipment: { id: equipmentId } as any
    });
    
    try {
      return await this.repository.save(productionEquipment);
    } catch (error: any) {
      if (error.code === '23505') { // Postgres unique violation code
        throw new ConflictException('Este equipamento já está agendado nesta data.');
      }
      throw error;
    }
  }

  async findAll() {
    const production_equipment = await this.repository.find({
      relations: ['production', 'equipment'],
      order: { createdAt: 'DESC' }
    });
    return production_equipment;
  }

async findOne(id: string): Promise<ProductionEquipment> {
    const allocation = await this.repository.findOne({
      where: { id },
      relations: ['production', 'equipment'],
    });

    if (!allocation) {
      throw new NotFoundException(`Alocação de equipamento com ID ${id} não encontrada`);
    }

    return allocation;
  }

  async update(id: string, updateDto: UpdateProductionEquipmentDto): Promise<ProductionEquipment> {
    const allocation = await this.findOne(id);
    const { productionId, equipmentId, ...rest } = updateDto;

    // Se houver troca de projeto ou equipamento no update
    if (productionId) allocation.production = { id: productionId } as any;
    if (equipmentId) allocation.equipment = { id: equipmentId } as any;

    this.repository.merge(allocation, rest);
    
    // Validar se há outro conflito com a mesma data e equipamento
    if (updateDto.usageDate || updateDto.equipmentId) {
       const existing = await this.repository.findOne({
          where: {
            equipment: { id: allocation.equipment.id },
            usageDate: allocation.usageDate
          }
       });
       if (existing && existing.id !== allocation.id) {
         throw new ConflictException('Este equipamento já está agendado nesta data.');
       }
    }

    try {
       return await this.repository.save(allocation);
    } catch (error: any) {
      if (error.code === '23505') { // Postgres unique violation code
        throw new ConflictException('Este equipamento já está agendado nesta data.');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const allocation = await this.findOne(id);
    await this.repository.delete(id);
  }

  async checkAvailability(equipmentId: string, usageDate: string, excludeProductionId?: string) {
    const qb = this.repository.createQueryBuilder('pe')
      .where('pe.equipmentId = :equipmentId', { equipmentId })
      .andWhere('pe.usageDate = :usageDate', { usageDate });
    
    if (excludeProductionId) {
      qb.andWhere('pe.productionId != :excludeProductionId', { excludeProductionId });
    }
    
    const count = await qb.getCount();
    return { available: count === 0 };
  }
}

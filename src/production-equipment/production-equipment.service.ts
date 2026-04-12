import { Injectable, NotFoundException } from '@nestjs/common';
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
    const productionEquipment = this.repository.create({
      ...rest,
      production: { id: productionId } as any,
      equipment: { id: equipmentId } as any
    });
    return await this.repository.save(productionEquipment);
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
    return await this.repository.save(allocation);
  }

  async remove(id: string): Promise<void> {
    const allocation = await this.findOne(id);
    await this.repository.delete(id);
  }
}

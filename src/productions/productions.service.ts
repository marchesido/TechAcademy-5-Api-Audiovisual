import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Production } from './entities/production.entity';
import { Repository, DataSource } from 'typeorm';
import { ProductionEquipment } from 'src/production-equipment/entities/production-equipment.entity';

@Injectable()
export class ProductionsService {
  
  constructor(
      @InjectRepository(Production)
      private readonly repository: Repository<Production>,
      @InjectRepository(ProductionEquipment)
      private readonly equipmentRepository: Repository<ProductionEquipment>,
      private readonly dataSource: DataSource,
    ) {}

  async create(createProductionDto: CreateProductionDto) {
    const { projectId, productionEquipments, ...restData } = createProductionDto;
    const production = this.repository.create({
       ...restData,
       project: { id: projectId } as any
    });

    const savedProduction = await this.repository.save(production);

    if (productionEquipments && productionEquipments.length > 0) {
      const equipamentosToSave = productionEquipments.map((pe) => {
        return this.equipmentRepository.create({
          productionId: savedProduction.id,
          equipmentId: pe.equipmentId,
          quantity: pe.quantity,
          usageDate: pe.usageDate,
          customDailyCost: pe.customDailyCost,
        });
      });
      await this.equipmentRepository.save(equipamentosToSave);
    }

    return this.findOne(savedProduction.id);
  }

  async findAll(): Promise<Production[]> {
    return await this.repository.find({
      relations: ['project', 'productionEquipments', 'productionEquipments.equipment'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Production> {
    const production = await this.repository.findOne({
      where: { id },
      relations: ['project', 'productionEquipments', 'productionEquipments.equipment'],
    });

    if (!production) {
      throw new NotFoundException(`Produção com ID ${id} não encontrada`);
    }

    return production;
  }

  async update(id: string, updateProductionDto: UpdateProductionDto): Promise<Production> {
    const { projectId, productionEquipments, ...restData } = updateProductionDto;
    const production = await this.findOne(id);
    
    if (projectId) {
      production.project = { id: projectId } as any;
    }

    this.repository.merge(production, restData);
    await this.repository.save(production);

    if (productionEquipments !== undefined) {
      // Remover equipamentos antigos
      await this.equipmentRepository.delete({ productionId: id });

      // Adicionar os novos (se houver)
      if (productionEquipments.length > 0) {
        const equipamentosToSave = productionEquipments.map((pe) => {
          return this.equipmentRepository.create({
            productionId: id,
            equipmentId: pe.equipmentId,
            quantity: pe.quantity,
            usageDate: pe.usageDate,
            customDailyCost: pe.customDailyCost,
          });
        });
        await this.equipmentRepository.save(equipamentosToSave);
      }
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const production = await this.findOne(id); // validador de not found
    await this.repository.delete(id);
  }
}
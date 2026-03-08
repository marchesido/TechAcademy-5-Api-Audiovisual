import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Production } from './entities/production.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductionsService {
  
  constructor(
      @InjectRepository(Production)
      private readonly repository: Repository<Production>,
    ) {}

  async create(createProductionDto: CreateProductionDto) {
    const Production = this.repository.create(createProductionDto);
    return await this.repository.save(Production);
  }

  async findAll(): Promise<Production[]> {
    return await this.repository.find({
      relations: ['project'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Production> {
    const production = await this.repository.findOne({
      where: { id },
      relations: ['project'],
    });

    if (!production) {
      throw new NotFoundException(`Produção com ID ${id} não encontrada`);
    }

    return production;
  }

  async update(id: string, updateProductionDto: UpdateProductionDto): Promise<Production> {
    const production = await this.findOne(id);
    
    if (updateProductionDto.projectId) {
      production.project = { id: updateProductionDto.projectId } as any;
    }

    this.repository.merge(production, updateProductionDto);
    return await this.repository.save(production);
  }

  async remove(id: string): Promise<void> {
    const production = await this.findOne(id);
    await this.repository.remove(production);
  }
}
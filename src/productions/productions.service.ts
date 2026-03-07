import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all productions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} production`;
  }

  update(id: number, updateProductionDto: UpdateProductionDto) {
    return `This action updates a #${id} production`;
  }

  remove(id: number) {
    return `This action removes a #${id} production`;
  }
}

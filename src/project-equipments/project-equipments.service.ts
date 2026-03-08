import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectEquipmentDto } from './dto/create-project-equipment.dto';
import { UpdateProjectEquipmentDto } from './dto/update-project-equipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEquipment } from './entities/project-equipment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectEquipmentsService {

  constructor(
        @InjectRepository(ProjectEquipment)
        private readonly repository: Repository<ProjectEquipment>,
      ) {}

  async create(createProjectEquipmentDto: CreateProjectEquipmentDto) {
    const ProjectEquipment = this.repository.create(createProjectEquipmentDto)
    return await this.repository.save(ProjectEquipment);
  }

  async findAll() {
    const project_equipment = await this.repository.find();
    return project_equipment;
  }

async findOne(id: string): Promise<ProjectEquipment> {
    const allocation = await this.repository.findOne({
      where: { id },
      relations: ['project', 'equipment'],
    });

    if (!allocation) {
      throw new NotFoundException(`Alocação de equipamento com ID ${id} não encontrada`);
    }

    return allocation;
  }

  async update(id: string, updateDto: UpdateProjectEquipmentDto): Promise<ProjectEquipment> {
    const allocation = await this.findOne(id);

    // Se houver troca de projeto ou equipamento no update
    if (updateDto.projectId) allocation.project = { id: updateDto.projectId } as any;
    if (updateDto.equipmentId) allocation.equipment = { id: updateDto.equipmentId } as any;

    this.repository.merge(allocation, updateDto);
    return await this.repository.save(allocation);
  }

  async remove(id: string): Promise<void> {
    const allocation = await this.findOne(id);
    await this.repository.remove(allocation);
  }
}

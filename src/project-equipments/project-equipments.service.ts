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
    const { projectId, equipmentId, ...rest } = createProjectEquipmentDto;
    const projectEquipment = this.repository.create({
      ...rest,
      project: { id: projectId } as any,
      equipment: { id: equipmentId } as any
    });
    return await this.repository.save(projectEquipment);
  }

  async findAll() {
    const project_equipment = await this.repository.find({
      relations: ['project', 'equipment'],
      order: { createdAt: 'DESC' }
    });
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
    const { projectId, equipmentId, ...rest } = updateDto;

    // Se houver troca de projeto ou equipamento no update
    if (projectId) allocation.project = { id: projectId } as any;
    if (equipmentId) allocation.equipment = { id: equipmentId } as any;

    this.repository.merge(allocation, rest);
    return await this.repository.save(allocation);
  }

  async remove(id: string): Promise<void> {
    const allocation = await this.findOne(id);
    await this.repository.delete(id);
  }
}

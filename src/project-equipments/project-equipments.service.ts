import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} projectEquipment`;
  }

  update(id: number, updateProjectEquipmentDto: UpdateProjectEquipmentDto) {
    return `This action updates a #${id} projectEquipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectEquipment`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateProjectEquipmentDto } from './dto/create-project-equipment.dto';
import { UpdateProjectEquipmentDto } from './dto/update-project-equipment.dto';

@Injectable()
export class ProjectEquipmentsService {
  create(createProjectEquipmentDto: CreateProjectEquipmentDto) {
    return 'This action adds a new projectEquipment';
  }

  findAll() {
    return `This action returns all projectEquipments`;
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

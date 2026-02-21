import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectEquipmentDto } from './create-project-equipment.dto';

export class UpdateProjectEquipmentDto extends PartialType(
  CreateProjectEquipmentDto,
) {}

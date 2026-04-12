import { PartialType } from '@nestjs/swagger';
import { CreateProductionEquipmentDto } from './create-production-equipment.dto';

export class UpdateProductionEquipmentDto extends PartialType(CreateProductionEquipmentDto) {}

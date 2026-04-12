import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProductionEquipmentDto } from './dto/create-production-equipment.dto';
import { UpdateProductionEquipmentDto } from './dto/update-production-equipment.dto';
import { ProductionEquipmentsService } from './production-equipment.service';

@Controller('production-equipment')
export class ProductionEquipmentController {
  constructor(private readonly productionEquipmentService: ProductionEquipmentsService) {}

  @Post()
  create(@Body() createProductionEquipmentDto: CreateProductionEquipmentDto) {
    return this.productionEquipmentService.create(createProductionEquipmentDto);
  }

  @Get()
  findAll() {
    return this.productionEquipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionEquipmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionEquipmentDto: UpdateProductionEquipmentDto) {
    return this.productionEquipmentService.update(id, updateProductionEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionEquipmentService.remove(id);
  }
}

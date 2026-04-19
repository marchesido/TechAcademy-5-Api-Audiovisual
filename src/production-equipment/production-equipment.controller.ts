import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateProductionEquipmentDto } from './dto/create-production-equipment.dto';
import { UpdateProductionEquipmentDto } from './dto/update-production-equipment.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductionEquipmentsService } from './production-equipment.service';

@ApiTags('Productions-equipments')
@Controller('production-equipments')
export class ProductionEquipmentsController {
  constructor(
    private readonly ProductionEquipmentsService: ProductionEquipmentsService,
  ) {}

  @Post()
  create(@Body() createProductionEquipmentDto: CreateProductionEquipmentDto) {
    return this.ProductionEquipmentsService.create(createProductionEquipmentDto);
  }

  @Get()
  findAll() {
    return this.ProductionEquipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ProductionEquipmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionEquipmentDto: UpdateProductionEquipmentDto,
  ) {
    return this.ProductionEquipmentsService.update(id, updateProductionEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProductionEquipmentsService.remove(id);
  }

  @Get('check-availability/:equipmentId/:usageDate')
  checkAvailability(
    @Param('equipmentId') equipmentId: string,
    @Param('usageDate') usageDate: string,
    @Query('excludeProductionId') excludeProductionId?: string
  ) {
    return this.ProductionEquipmentsService.checkAvailability(equipmentId, usageDate, excludeProductionId);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductionsService } from './productions.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('productions')
@UseGuards(JwtAuthGuard)
@Controller('productions')
export class ProductionsController {
  constructor(private readonly productionsService: ProductionsService) {}

  @Post()
  create(@Body() createProductionDto: CreateProductionDto) {
    return this.productionsService.create(createProductionDto);
  }

  @Get()
  findAll() {
    return this.productionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    return this.productionsService.update(id, updateProductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionsService.remove(id);
  }
}

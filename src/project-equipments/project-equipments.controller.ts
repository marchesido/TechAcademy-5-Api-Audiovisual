import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectEquipmentsService } from './project-equipments.service';
import { CreateProjectEquipmentDto } from './dto/create-project-equipment.dto';
import { UpdateProjectEquipmentDto } from './dto/update-project-equipment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('projects-equipments')
@Controller('project-equipments')
export class ProjectEquipmentsController {
  constructor(
    private readonly projectEquipmentsService: ProjectEquipmentsService,
  ) {}

  @Post()
  create(@Body() createProjectEquipmentDto: CreateProjectEquipmentDto) {
    return this.projectEquipmentsService.create(createProjectEquipmentDto);
  }

  @Get()
  findAll() {
    return this.projectEquipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectEquipmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectEquipmentDto: UpdateProjectEquipmentDto,
  ) {
    return this.projectEquipmentsService.update(+id, updateProjectEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectEquipmentsService.remove(+id);
  }
}

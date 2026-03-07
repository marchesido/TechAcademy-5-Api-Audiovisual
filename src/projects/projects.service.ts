import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
      @InjectRepository(Project)
      private readonly repository: Repository<Project>,
    ) {}
  async create(createProjectDto: CreateProjectDto) {
    const Project = this.repository.create(createProjectDto)
    return await this.repository.save(Project);
  }

  async findAll() {
    const project = await this.repository.find();
    return project;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}

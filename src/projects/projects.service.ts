import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    // Criamos o projeto vinculando o objeto cliente através do ID vindo do DTO
    const project = this.repository.create({
      ...createProjectDto,
      client: { id: createProjectDto.clientId },
    });
    return await this.repository.save(project);
  }

  async findAll(): Promise<Project[]> {
    // Retorna os projetos incluindo os dados do Cliente e as Produções vinculadas
    return await this.repository.find({
      relations: ['client', 'productions'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.repository.findOne({
      where: { id },
      relations: ['client', 'productions', 'projectEquipments', 'projectEquipments.equipment'],
    });

    if (!project) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);

    // Se houver alteração de cliente, atualizamos a referência
    if (updateProjectDto.clientId) {
      project.client = { id: updateProjectDto.clientId } as any;
    }

    this.repository.merge(project, updateProjectDto);
    return await this.repository.save(project);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    // Como usamos CASCADE na Entity, deletar o projeto removerá as produções vinculadas
    await this.repository.remove(project);
  }
}
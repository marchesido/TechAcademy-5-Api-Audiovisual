import { Project } from './project.entity';
import { Client } from '../../clients/entities/client.entity';
import { Production } from '../../productions/entities/production.entity';

describe('ProjectEntity', () => {
  it('should create a Project entity', () => {
    const project = new Project();
    project.id = 'uuid';
    project.title = 'Project 1';
    project.description = 'Desc';
    project.budget = 1000;
    project.status = 'active';
    project.deadline = new Date();
    project.createdAt = new Date();
    project.updatedAt = new Date();
    project.client = new Client();
    project.productions = [new Production()];

    expect(project).toBeDefined();
    expect(project.title).toBe('Project 1');
    expect(project.budget).toBe(1000);
  });
});

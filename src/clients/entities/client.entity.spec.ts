import { Client } from './client.entity';
import { Project } from '../../projects/entities/project.entity';

describe('ClientEntity', () => {
  it('should create a Client entity', () => {
    const client = new Client();
    client.id = 'uuid';
    client.name = 'Client 1';
    client.email = 'client@test.com';
    client.phone = '123456789';
    client.cpf = '12345678912';
    client.company = 'Company X';
    client.createdAt = new Date();
    client.updatedAt = new Date();
    client.deletedAt = new Date();
    client.projects = [new Project()];

    expect(client).toBeDefined();
    expect(client.name).toBe('Client 1');
    expect(client.company).toBe('Company X');
  });
});

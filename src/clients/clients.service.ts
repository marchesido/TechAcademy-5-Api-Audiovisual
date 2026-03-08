import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = this.repository.create(createClientDto);
    return await this.repository.save(client);
  }

  async findAll() {
    const clients = await this.repository.find();
    return clients;
  }

   async findOne(id: string): Promise<Client> {
    const client = await this.repository.findOne({ where: { id } });
    if (!client) throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    this.repository.merge(client, updateClientDto);
    return await this.repository.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.repository.softRemove(client);
  }
}
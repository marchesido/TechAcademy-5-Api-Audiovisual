import { create } from 'domain';
import { Project } from 'src/projects/entities/project.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 150 })
  name: string;
  @Column({ length: 150 })
  @Index({ unique: true })
  email: string;
  @Column({ length: 150, nullable: false })
  phone: string;
  @Column({ length: 11, unique: true })
  cpf: string;
  @Column({ length: 150, nullable: false })
  company: string;
  @CreateDateColumn()
  createdAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[];
}

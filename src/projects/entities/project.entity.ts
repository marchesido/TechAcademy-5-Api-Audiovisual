import { Client } from 'src/clients/entities/client.entity';
import { Production } from 'src/productions/entities/production.entity';
import { ProjectEquipment } from 'src/project-equipments/entities/project-equipment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 150 })
  title: string;
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  budget: number;

  @Column({ length: 50, default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Client, (client) => client.projects, {
    onDelete: 'CASCADE',
  })
  client: Client;

  @OneToMany(() => Production, (Production) => Production.project)
  productions: Production[];

  @OneToMany(() => ProjectEquipment, (projectEquipment) => projectEquipment.project)
  projectEquipments: ProjectEquipment[];
}

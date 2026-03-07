import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Equipment } from 'src/equipments/entities/equipment.entity';

@Entity('project_equipments')
export class ProjectEquipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'date' })
  usageDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  customDailyCost: number; // Caso o preço mude*

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  projectId: string;

  @Column()
  equipmentId: string;

  @ManyToOne(() => Project, (project) => project.id, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @ManyToOne(() => Equipment, (equipment) => equipment.id,{nullable: false})
  @JoinColumn({ name: 'equipmentId' })
  equipment: Equipment;
}
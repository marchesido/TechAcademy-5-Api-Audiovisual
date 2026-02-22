import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('productions')
export class Production {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 100 })
  type: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cost: number;
  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;
  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;
  @Column({ type: 'text', nullable: true })
  notes: string;
  @CreateDateColumn()
  createdAt: Date;
}

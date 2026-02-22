import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100 })
  category: string;

  @Index({ unique: true })
  @Column({ length: 100, nullable: true })
  serialNumber: string; // Alterado para string por segurança (letras em números de série)

  @Column({ type: 'date', nullable: true })
  purchaseDate: Date;

  @Column({ length: 50, default: 'available' })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  dailyCost: number;

  @CreateDateColumn()
  createdAt: Date;
}

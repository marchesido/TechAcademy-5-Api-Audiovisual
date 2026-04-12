import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Production } from 'src/productions/entities/production.entity';
import { Equipment } from 'src/equipments/entities/equipment.entity';

@Entity('production_equipments')
@Unique(['equipmentId', 'usageDate'])
export class ProductionEquipment {
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
  productionId: string;

  @Column()
  equipmentId: string;

  @ManyToOne(() => Production, (production) => production.id, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'productionId' })
  production: Production;

  @ManyToOne(() => Equipment, (equipment) => equipment.id,{nullable: false})
  @JoinColumn({ name: 'equipmentId' })
  equipment: Equipment;
}

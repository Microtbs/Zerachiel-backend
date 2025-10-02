import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Municipality } from '../../municipalities/entities/municipality.entity';

@Entity('municipality_contacts')
export class MunicipalityContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  pec: string;

  @Column({ type: 'text', nullable: true })
  website?: string;

  @OneToOne(() => Municipality, (municipality) => municipality.contact, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_municipality' }) // FK
  municipality: Municipality;
}

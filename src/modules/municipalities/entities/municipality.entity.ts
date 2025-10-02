import { MunicipalityContact } from '../../municipality_contacts/entities/municipality_contacts.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity('municipalities')
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @OneToOne(() => MunicipalityContact, (contact) => contact.municipality)
  contact: MunicipalityContact;
}

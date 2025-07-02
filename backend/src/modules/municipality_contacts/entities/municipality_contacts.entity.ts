import { Municipality } from 'src/modules/municipalities/entities/municipality.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('municipality_contacts')
export class MunicipalityContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  pec: string;

  @OneToOne(
    () => Municipality,
    (municipality) => municipality.municipality_contacts,
  )
  @JoinColumn({ name: 'municipality_id' })
  municipality: Municipality;
}

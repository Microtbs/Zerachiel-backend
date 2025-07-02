import { MunicipalityContact } from '../../municipality_contacts/entities/municipality_contacts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('municipalities')
export class Municipality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(
    () => MunicipalityContact,
    (municipality_contacts) => municipality_contacts.id,
  )
  municipality_contacts: MunicipalityContact;
}

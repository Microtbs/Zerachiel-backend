import { MunicipalityContact } from 'src/modules/municipality_contacts/entities/municipality_contacts.entity';
import { Entity, Column, PrimaryGeneratedColumn,OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Municipalities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => MunicipalityContact, (municipality_contacts) => municipality_contacts.id)
  municipality_contacts: MunicipalityContact;
}

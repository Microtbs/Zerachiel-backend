import { MunicipalityContact } from 'src/modules/municipality_contacts/entities/municipality_contacts.entity';
import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';

@Entity()
export class Municipalities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MunicipalityContact, (municipality_contacts) => municipality_contacts.id)
  municipality_conctats: MunicipalityContact[];
}

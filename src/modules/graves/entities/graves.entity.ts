import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { RequestOffice } from '../../request_offices/entities/request_office.entity';
import { Deceased } from '../../deceased/entities/deceased.entity';
import { DigitalFlowers } from 'src/modules/digital_flowers/entities/digital_flower.entity';

@Entity('graves')
export class Grave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  status: boolean;

  @Column()
  stonemason: string;

  @Column()
  flowers_count: number;

  @Column()
  section: string;

  @ManyToOne(() => RequestOffice, {
    eager: true, // Carica gli uffici richieste associati quando si carica la tomba associati
    nullable: true, // L'ufficio richieste può essere nulla
    onDelete: 'CASCADE', // Se l'ufficio richieste viene eliminato, le tombe associate vengono eliminate
  })
  @JoinColumn({ name: 'request_office_id' }) // nome della colonna di join nella tabella 'graves'
  requestoffice: RequestOffice;

  @OneToMany(() => Deceased, (deceased) => deceased.grave)
  deceased: Deceased[];

  @OneToMany(() => DigitalFlowers, (digitalFlowers) => digitalFlowers.grave)
  digitalFlowers: DigitalFlowers[];

}

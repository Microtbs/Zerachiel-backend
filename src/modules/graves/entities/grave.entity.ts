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
import { DigitalFlower } from '../../digital_flowers/entities/digital_flower.entity';

/**
 * Entità che rappresenta una tomba con coordinate e stato manutentivo.
 */
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
  section: string;

  @ManyToOne(() => RequestOffice, {
    eager: true, // Carica gli uffici richieste associati quando si carica la tomba associati
    nullable: true, // L'ufficio richieste può essere nulla
    onDelete: 'CASCADE', // Se l'ufficio richieste viene eliminato, le tombe associate vengono eliminate
  })
  @JoinColumn({ name: 'id_request_office' }) // nome della colonna di join nella tabella 'graves'
  requestoffice: RequestOffice;

  @OneToMany(() => Deceased, (deceased) => deceased.grave)
  deceased: Deceased[];

  @OneToMany(() => DigitalFlower, (digitalFlowers) => digitalFlowers.grave)
  digitalFlowers: DigitalFlower[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Caretaker } from '../../caretakers/entities/caretakers.entity';
import { RequestOffice } from '../../request_offices/entities/request_office.entity';

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

  @ManyToOne(() => Caretaker, (caretakers) => caretakers.graves, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'caretaker_id' }) // nome della colonna di join nella tabella 'graves'
  caretakers: Caretaker;

  @ManyToOne(() => RequestOffice, {
    eager: true, // Carica gli uffici richieste associati quando si carica la tomba associati
    nullable: true, // L'ufficio richieste può essere nulla
    onDelete: 'CASCADE', // Se l'ufficio richieste viene eliminato, le tombe associate vengono eliminate
  })
  @JoinColumn({ name: 'request_office_id' }) // nome della colonna di join nella tabella 'graves'
  requestoffice: RequestOffice;
}

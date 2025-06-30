import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Grave } from '../../graves/entities/graves.entity';
import { Municipalities } from '../../municipalities/entities/municipalities.entity';

/**
 * Entità che rappresenta un ufficio richieste.
 * Questa entità può essere utilizzata per gestire gli uffici associati a lle richieste.
 */
@Entity('request_offices')
export class RequestOffice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  requests_processed: boolean;

  @ManyToOne(() => Grave, {
    eager: true, // Carica l'utente associato quando si carica la richiesta
    nullable: false, // L'utente non può essere nullo
    onDelete: 'CASCADE', // Se l'utente viene eliminato, le richieste associate vengono eliminate
  })
  @JoinColumn({ name: 'grave_id' }) // nome della colonna di join nella tabella 'requests'
  grave: Grave;

  @ManyToOne(() => Municipalities, {
    eager: true, // Carica l'utente associato quando si carica la richiesta
    nullable: false, // L'utente non può essere nullo
    onDelete: 'CASCADE', // Se l'utente viene eliminato, le richieste associate vengono eliminate
  })
  @JoinColumn({ name: 'municipality_id' }) // nome della colonna di join nella tabella 'requests'
  municipality: Municipalities; // Mezz'ora di preghiere per capire e necesita di un bel rename :) -- TODO : Municipality -> Municipalities && municipalities.entity -> municipality.entity
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Municipality } from '../../municipalities/entities/municipality.entity';

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

  @ManyToOne(() => Municipality, {
    eager: true, // Carica il municipio associato quando si carica l'ufficio richieste
    nullable: false, // Il municipio non può essere nullo
    onDelete: 'CASCADE', // Se il municipio viene eliminato, gli uffici richieste associate vengono eliminate
  })
  @JoinColumn({ name: 'municipality_id' }) // nome della colonna di join nella tabella 'municipalities'
  municipality: Municipality; // Mezz'ora di preghiere per capire e necessita di un bel rename :) -- TODO : Municipality -> Municipalities && municipalities.entity -> municipality.entity
}

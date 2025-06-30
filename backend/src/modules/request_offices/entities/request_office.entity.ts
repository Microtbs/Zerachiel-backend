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
    eager: true, // Carica le tombe associate quando si carica l'ufficio richieste
    nullable: false, // La tomba non può essere nulla
    onDelete: 'CASCADE', // Se la tomba viene eliminato, associate vengono eliminate
  })
  @JoinColumn({ name: 'grave_id' }) // nome della colonna di join nella tabella 'graves'
  grave: Grave;
  // -- FIX : Questa relazione dovrebbe essere "opzionale" OneToMany, ma nel database viene specificata una relazione ManyToOne -> Includere request_offices_id nella tabella 'graves' per evitare errori di relazione

  @ManyToOne(() => Municipalities, {
    eager: true, // Carica il municipio associato quando si carica l'ufficio richieste
    nullable: false, // Il municipio non può essere nullo
    onDelete: 'CASCADE', // Se il municipio viene eliminato, gli uffici richieste associate vengono eliminate
  })
  @JoinColumn({ name: 'municipality_id' }) // nome della colonna di join nella tabella 'municipalities'
  municipality: Municipalities; // Mezz'ora di preghiere per capire e necessita di un bel rename :) -- TODO : Municipality -> Municipalities && municipalities.entity -> municipality.entity
}

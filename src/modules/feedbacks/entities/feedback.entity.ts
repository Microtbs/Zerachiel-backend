import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RequestOffice } from '../../request_offices/entities/request_office.entity'; // TODO :Fare Entità

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  details: string;

  @ManyToOne(() => User, {
    eager: true, // Carica l'utente associato quando si carica la richiesta
    nullable: false, // L'utente non può essere nullo
    onDelete: 'CASCADE', // Se l'utente viene eliminato, le richieste associate vengono eliminate
  })
  @JoinColumn({ name: 'user_id' }) // nome della colonna di join nella tabella 'requests'
  user: User;

  @ManyToOne(() => RequestOffice, {
    eager: true, // Carica l'ufficio richieste associato quando si carica la richiesta
    nullable: false, // L'ufficio richieste non può essere nullo
    onDelete: 'CASCADE', // Se l'ufficio richieste viene cancellato, anche la richiesta associata viene cancellata
  })
  @JoinColumn({ name: 'request_office_id' })
  requestOffice: RequestOffice;
}

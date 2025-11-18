import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Grave } from '../../graves/entities/grave.entity';

/**
 * Entità anagrafica dei defunti sepolti nel cimitero.
 */
@Entity('deceased')
export class Deceased {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 30, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 30, nullable: false })
  lastName: string;

  @Column({ name: 'dob', type: 'date', nullable: false })
  dob: Date;

  @Column({ name: 'dod', type: 'date', nullable: false })
  dod: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Grave, (grave) => grave.deceased, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_grave' })
  grave: Grave;
}

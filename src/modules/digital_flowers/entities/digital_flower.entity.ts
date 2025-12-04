import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Account } from '../../accounts/entities/account.entity';
import { Grave } from '../../graves/entities/grave.entity';
import { FlowerType } from '../../../common/enums/flower.enums';

/**
 * Snapshot di un tributo digitale inviato da un utente verso una tomba.
 */
@Entity('digital_flowers')
export class DigitalFlower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: FlowerType, default: FlowerType.OTHER })
  type: FlowerType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'int' })
  id_sender: number;

  @Column({ type: 'int' })
  id_grave: number;

  @ManyToOne(() => Account, (account) => account.digitalFlowers)
  @JoinColumn({ name: 'id_sender' })
  sender: Account;

  @ManyToOne(() => Grave, (grave) => grave.digitalFlowers)
  @JoinColumn({ name: 'id_grave' })
  grave: Grave;
}

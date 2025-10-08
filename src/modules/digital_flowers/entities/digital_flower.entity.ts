import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Account } from '../../accounts/entities/account.entity';
import { Grave } from '../../graves/entities/graves.entity';
import { FlowerType } from '../../../common/enums/flower.enums';

@Entity('digital_flowers')
export class DigitalFlower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: FlowerType, default: FlowerType.OTHER })
  type: FlowerType;

  @Column({ type: 'int' })
  created_at: number;

  @Column({ type: 'int' })
  id_sender: number;

  @Column({ type: 'int' })
  id_grave: number;

  /*@ManyToOne(() => Account, account => account.sentMessages, { onDelete: 'CASCADE' })
  sender: Account;

  @ManyToOne(() => Grave, grave => grave.deceased, { onDelete: 'CASCADE', nullable: true })
  grave: Grave;*/

  @ManyToOne(() => Account, (account) => account.digitalFlowers, {
    eager: false,
  })
  @JoinColumn({ name: 'id_sender' })
  sender: Account;

  @ManyToOne(() => Grave, (grave) => grave.digitalFlowers, { eager: false })
  @JoinColumn({ name: 'id_grave' })
  grave: Grave;
}

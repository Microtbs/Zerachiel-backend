import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum FlowerType {
  ROSE = 'rose',
  LILY = 'lily',
  TULIP = 'tulip',
  OTHER = 'other',
}

import { Account } from '../../account/entities/account.entity';
import { Grave } from '../../graves/entities/graves.entity';

@Entity()
export class DigitalFlowers {
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

  //Superflua adesso (?) 
  //@ManyToOne(() => Account, (account) => account.id, {})
  //@JoinColumn({ name: 'account_id' })
  account: Account;
  //eager: true
  //@ManyToOne(() => Grave, (grave) => grave.id, {})
  //@JoinColumn({ name: 'grave_id' })
  grave: Grave;
}

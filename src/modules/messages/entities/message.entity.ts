import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { RequestOffice } from '../../request_offices/entities/request_office.entity';
import {
  msgStatus,
  msgType,
  message_type,
} from '../../../common/enums/message.enums';

/**
 * Entity TypeORM che rappresenta sia richieste che feedback gestiti dagli uffici.
 */
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: message_type })
  message_type: message_type;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  created_at: number;

  @Column({ type: 'enum', enum: msgType })
  type: msgType;

  @Column({ type: 'enum', enum: msgStatus })
  status: msgStatus;

  @ManyToOne(() => Account, (account) => account.sentMessages, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_sender' })
  sender: Account;

  @ManyToOne(() => Account, (account) => account.receivedMessages, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'id_receiver' })
  receiver: Account;

  @ManyToOne(() => RequestOffice, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_request_office' })
  requestOffice: RequestOffice;
}

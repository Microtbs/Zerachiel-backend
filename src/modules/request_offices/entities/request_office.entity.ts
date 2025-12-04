import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Municipality } from '../../municipalities/entities/municipality.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('request_offices')
export class RequestOffice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Municipality, (municipality) => municipality.requestOffices)
  @JoinColumn({ name: 'id_municipality' })
  municipality: Municipality;

  @OneToMany(() => Message, (message) => message.requestOffice)
  messages: Message[];
}

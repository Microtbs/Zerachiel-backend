import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Grave } from '../../graves/entities/graves.entity';

@Entity('deceased')
export class Deceased {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  dob: Date;

  @Column()
  dod: Date;

  @ManyToOne(() => Grave, (graves) => graves.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'grave_id' })
  grave: Grave[];
}

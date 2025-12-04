import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { RequestOffice } from '../../request_offices/entities/request_office.entity';
import { Deceased } from '../../deceased/entities/deceased.entity';
import { DigitalFlower } from '../../digital_flowers/entities/digital_flower.entity';

@Entity('graves')
export class Grave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  status: boolean;

  @Column()
  stonemason: string;

  @Column()
  section: string;

  @ManyToOne(() => RequestOffice, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_request_office' })
  requestoffice: RequestOffice;

  @OneToMany(() => Deceased, (deceased) => deceased.grave)
  deceased: Deceased[];

  @OneToMany(() => DigitalFlower, (digitalFlowers) => digitalFlowers.grave)
  digitalFlowers: DigitalFlower[];
}

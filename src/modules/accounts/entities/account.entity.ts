import { Message } from '../../messages/entities/message.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { DigitalFlower } from '../../digital_flowers/entities/digital_flower.entity';
import { UserRole } from '../../roles/entities/user_role.entity';
import { Exclude } from 'class-transformer';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  tax_code: string;

  @Column()
  @Exclude()
  hashed_password: string;

  @Column()
  family_member: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @OneToMany(() => DigitalFlower, (flower) => flower.sender)
  digitalFlowers: DigitalFlower[];

  @OneToMany(() => DigitalFlower, (flower) => flower.sender)
  digitalFlower: DigitalFlower[];

  @OneToMany(() => UserRole, (userRole) => userRole.account)
  userRoles: UserRole[];
}

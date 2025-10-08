import { Message } from '../../messages/entities/message.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { DigitalFlower } from '../../digital_flowers/entities/digital_flower.entity';
//import { UserRoles } from 'src/modules/user_Roles/entities/userRoles.entity';

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
  hashed_password: string;

  @Column()
  family_member: boolean;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  /* @Column({ name: 'updated_at', type: 'timestamp' })
     updated_at: Date;
     */

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @OneToMany(() => DigitalFlower, (flower) => flower.sender)
  digitalFlowers: DigitalFlower[];

  /* @OneToMany(() => RoleShift, shift => shift.role)
     roleShifts: RoleShift[];
   
     @OneToMany(() => UserRoles, userRole => userRole.account)
     userRoles: UserRole[];*/
}

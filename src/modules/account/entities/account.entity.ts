import { Message } from 'src/modules/messages/entities/message.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { DigitalFlowers } from 'src/modules/digital_flowers/entities/digital_flower.entity'
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

    @Column()
    created_at: Date;


    @OneToMany(() => Message, message => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages: Message[];

    @OneToMany(() => DigitalFlowers, flower => flower.sender)
    digitalFlowers: DigitalFlowers[];

    /* @OneToMany(() => RoleShift, shift => shift.worker)
     roleShifts: RoleShift[];
   
     @OneToMany(() => UserRoles, userRole => userRoles.account)
     userRoles: UserRoles[];*/


}

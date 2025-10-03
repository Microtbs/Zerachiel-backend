import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { RequestOffice } from '../../request_offices/entities/request_office.entity';
import { Exclude } from 'class-transformer';
export enum msgStatus {
    SENT = 'sent',
    TAKEN = 'taken',
    COMPLETED = 'completed',
    REJECTED = 'rejected',
}
export enum msgType {
    CLEAN = 'clean',
    MAINTENANCE = 'maintenance',
    EXAMINATION = 'examination',
    CREATE = 'create',
    OTHER = 'other'
}
export enum message_type {
    REQUEST = 'request',
    FEEDBACK = 'feedback',
}

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


    @ManyToOne(() => Account, account => account.sentMessages, { eager: true, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_sender' })
    sender: Account;

    @ManyToOne(() => Account, account => account.receivedMessages, { eager: true, onDelete: 'CASCADE', nullable: true, })
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

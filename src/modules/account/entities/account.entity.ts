import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}

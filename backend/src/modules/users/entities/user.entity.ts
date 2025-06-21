import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('users')

export class User {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    first_name: String;

    @Column()
    last_name: String;

    @Column()
    email: String;

    @Column()
    tax_code: String;

    @Column()
    password: String;

    @Column()
    family_member: Boolean;
}

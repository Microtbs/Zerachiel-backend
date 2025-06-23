import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('municipality_contacts')

export class MunicipalityContact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    tel: string;

    @Column()
    pec: string;

    @Column()
    municipality_id: number;
}

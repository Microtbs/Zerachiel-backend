
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

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

    /* @Column()
     grave_id: number;*/

}

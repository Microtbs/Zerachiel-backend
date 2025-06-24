
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { Grave } from "src/modules/graves/entities/graves.entity";

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

    @ManyToOne(() => Grave, (graves) => graves.deceased { onDelete: 'SET NULL', nullable: true })
    grave: Grave[];

}

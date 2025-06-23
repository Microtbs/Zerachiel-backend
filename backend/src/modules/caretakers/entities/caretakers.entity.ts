import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Grave } from "src/modules/graves/entities/graves.entity";

@Entity('caretakers')
export class Caretaker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    phone: string;

    @Column({ type: 'timestamp' })
    shift_start_time: Date;

    @Column({ type: 'timestamp' })
    shift_end_time: Date;

    @Column()
    municipality_id: number;

    @OneToMany(() => Grave, (graves) => graves.caretakers)
    graves: Grave[];
}


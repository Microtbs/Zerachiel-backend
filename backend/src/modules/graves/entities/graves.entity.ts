import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Caretaker } from "src/modules/caretakers/entities/caretakers.entity";


@Entity("graves")
export class Grave {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    status: boolean

    @Column()
    stonemason: string

    @Column()
    flowers_count: number

    @Column()
    section: string

    @Column()
    caretakers_id: number

    @ManyToOne(() => Caretaker, (caretakers) => caretakers.graves, { onDelete: 'SET NULL', nullable: true })
    caretakers: Caretaker;

}
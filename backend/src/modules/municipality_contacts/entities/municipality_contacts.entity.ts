import { Municipalities } from "src/modules/municipalities/entities/municipalities.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";

@Entity('municipality_contacts')

export class MunicipalityContact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    pec: string;

    @OneToOne(() => Municipalities, (municipality) => municipality.municipality_contacts)
    @JoinColumn({ name: 'municipality_id' })
    municipality: Municipalities;
}

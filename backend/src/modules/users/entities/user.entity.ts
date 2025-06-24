import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Feedback } from "src/modules/feedbacks/entities/feedback.entity";
import { Request } from "src/modules/requests/entities/request.entity";
import { Flower } from "src/modules/digital_flowers/entities/digital-flowers.entity";



@Entity('users')

export class User {
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
    password: string;

    @Column()
    family_member: boolean;

    @OneToMany(() => Feedback, (feedbacks) => feedbacks.user)
    feedbacks: Feedback[];

    @OneToMany(() => Request, (requests) => requests.user)
    requests: Request[];

    @OneToMany(() => Flower, (flowers) => flowers.user)
    flowers: Flower[];
}

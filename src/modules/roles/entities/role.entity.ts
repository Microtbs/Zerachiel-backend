import { RoleType } from "../../../common/enums/roles.enums";
import { UserRole } from "../..//user_roles/entities/user_role.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    type: RoleType;

    @Column({ type: 'text', nullable: true })
    details?: string;

    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRoles: UserRole[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

@Entity('user_roles')
@Unique(['account', 'role']) // Non sono certo del suo utilizzo
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_account' })
  account: Account;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_role' })
  role: Role;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

/**
 * Tabella ponte che collega un account a uno specifico ruolo.
 * La unique constraint impedisce assegnazioni duplicate.
 */
@Entity('user_roles')
@Unique(['account', 'role'])
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

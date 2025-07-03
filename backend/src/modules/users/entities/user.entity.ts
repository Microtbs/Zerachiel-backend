import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { CreateAccountDto as RegisterDto } from '../../accounts/dto/create-account.dto';

export enum TokenType {
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

@Entity('verification_tokens')
export class VerificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @Index()
  token: number;

  @Column()
  @Index()
  email: string;

  @Column({ type: 'enum', enum: TokenType })
  type: TokenType;

  @Column({ type: 'jsonb', nullable: true })
  accountData: RegisterDto | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'timestamp' })
  cooldownExpiresAt: Date;
}

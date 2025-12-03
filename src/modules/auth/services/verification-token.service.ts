import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  VerificationToken,
  TokenType,
} from '../entities/verification-token.entity';
import { CreateAccountDto as RegisterDto } from '../../accounts/dto/create-account.dto';
import { randomInt } from 'crypto';
import {
  OTP_LENGTH,
  OTP_EXPIRY_MINUTES,
  OTP_COOLDOWN_MINUTES,
} from '../../../common/constants/auth.constants';

@Injectable()
export class VerificationTokenService {
  constructor(
    @InjectRepository(VerificationToken)
    private readonly tokenRepository: Repository<VerificationToken>,
  ) {}

  private generateSecureOTP(): number {
    const min = Math.pow(10, OTP_LENGTH - 1);
    const max = Math.pow(10, OTP_LENGTH) - 1;
    return randomInt(min, max + 1);
  }

  async createToken(
    email: string,
    type: TokenType,
    accountData?: RegisterDto,
  ): Promise<number> {
    await this.checkCooldown(email, type);

    const token = this.generateSecureOTP();
    const now = new Date();

    const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);
    const cooldownExpiresAt = new Date(
      now.getTime() + OTP_COOLDOWN_MINUTES * 60 * 1000,
    );

    await this.tokenRepository.delete({ email, type });

    const verificationToken = this.tokenRepository.create({
      token,
      email,
      type,
      accountData: accountData || null,
      expiresAt,
      cooldownExpiresAt,
    });

    await this.tokenRepository.save(verificationToken);

    return token;
  }

  async findValidToken(
    token: number,
    type: TokenType,
  ): Promise<VerificationToken | null> {
    const verificationToken = await this.tokenRepository.findOne({
      where: { token, type },
    });

    if (!verificationToken) {
      return null;
    }

    if (new Date() > verificationToken.expiresAt) {
      await this.tokenRepository.delete({ id: verificationToken.id });
      return null;
    }

    return verificationToken;
  }

  async checkCooldown(email: string, type: TokenType): Promise<void> {
    const existingToken = await this.tokenRepository.findOne({
      where: { email, type },
      order: { createdAt: 'DESC' },
    });

    if (existingToken) {
      const now = new Date();
      if (now < existingToken.cooldownExpiresAt) {
        const remainingSeconds = Math.ceil(
          (existingToken.cooldownExpiresAt.getTime() - now.getTime()) / 1000,
        );
        throw new BadRequestException(
          `Aspetta ancora ${remainingSeconds} secondi prima di richiedere un nuovo token`,
        );
      }
    }
  }

  async deleteToken(token: number, type: TokenType): Promise<void> {
    await this.tokenRepository.delete({ token, type });
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async cleanupExpired(): Promise<void> {
    await this.tokenRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AccountsModule } from '../accounts/accounts.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from '../../configs/jwtconfig';
import { MailModule } from '../mail/mail.module';
import { RolesModule } from '../roles/roles.module';
import { VerificationToken } from './entities/verification-token.entity';
import { VerificationTokenService } from './services/verification-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationToken]),
    AccountsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    MailModule,
    RolesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, VerificationTokenService],
})
export class AuthModule {}

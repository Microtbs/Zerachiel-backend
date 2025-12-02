import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountsService } from '../../accounts/accounts.service';
import { CreateAccountDto as RegisterDto } from '../../accounts/dto/create-account.dto';
import { LoginDto } from '../dto/login.dto';
import { RoleType } from '../../../common/enums/role.enums';
import { ROLE_PRIORITY } from '../../../common/constants/role-priority.constants';
import { MailService } from '../../mail/mail.service';
import { RolesService } from '../../roles/roles.service';
import { VerificationTokenService } from '../services/verification-token.service';
import { TokenType } from '../entities/verification-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
    private mailService: MailService,
    private rolesService: RolesService,
    private verificationTokenService: VerificationTokenService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.accountsService
      .findByEmail(dto.email)
      .catch(() => null);
    if (existing) throw new UnauthorizedException('Email già registrata');

    const verificationToken = await this.verificationTokenService.createToken(
      dto.email,
      TokenType.EMAIL_VERIFICATION,
      dto,
    );

    try {
      await this.mailService.sendVerificationEmail(
        dto.email,
        verificationToken,
      );
    } catch {
      throw new BadRequestException('Errore invio email di verifica');
    }

    return {
      message: 'Abbiamo inviato una mail di verifica nella tua casella.',
    };
  }
  async verifyEmail(token: number) {
    token = Number(token);
    const tokenData = await this.verificationTokenService.findValidToken(
      token,
      TokenType.EMAIL_VERIFICATION,
    );

    if (!tokenData || !tokenData.accountData) {
      throw new BadRequestException('Token non valido o scaduto');
    }

    const existing = await this.accountsService
      .findByEmail(tokenData.accountData.email)
      .catch(() => null);
    if (existing) {
      throw new BadRequestException('Hai già verificato la tua email');
    }

    const hashedPassword = await bcrypt.hash(
      tokenData.accountData.hashed_password,
      10,
    );

    const user = await this.accountsService.create({
      first_name: tokenData.accountData.first_name,
      last_name: tokenData.accountData.last_name,
      email: tokenData.accountData.email,
      tax_code: tokenData.accountData.tax_code,
      hashed_password: hashedPassword,
      family_member: tokenData.accountData.family_member,
    });

    await this.rolesService.createRoleofAccount(user.id, 1);
    await this.verificationTokenService.deleteToken(
      token,
      TokenType.EMAIL_VERIFICATION,
    );

    return { message: 'Email verificata con successo!' };
  }

  async login(dto: LoginDto) {
    const user = await this.accountsService.findByEmail(dto.email);
    const roleData = await this.accountsService.getRoleOfAccount(user.id);

    const roles: RoleType[] =
      roleData?.roles?.map((r) => r.type as RoleType) || [];

    if (roles.length === 0) {
      throw new UnauthorizedException('Nessun ruolo assegnato');
    }

    const selectedRole = roles.reduce((prev, curr) => {
      return ROLE_PRIORITY[curr] > ROLE_PRIORITY[prev] ? curr : prev;
    }, roles[0]);

    const isValid = await bcrypt.compare(dto.password, user.hashed_password);
    if (!isValid) throw new UnauthorizedException('Credenziali errate');

    const payload = {
      sub: user.id,
      roles: selectedRole,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async requestPasswordReset(email: string) {
    await this.accountsService.findByEmail(email);

    const token = await this.verificationTokenService.createToken(
      email,
      TokenType.PASSWORD_RESET,
    );

    try {
      await this.mailService.sendRecoverEmail(email, token);
    } catch {
      throw new BadRequestException('Errore invio email di reset password');
    }

    return {
      message: 'Abbiamo inviato un codice per reimpostare la password.',
    };
  }

  async resetPassword(token: number, newPassword: string) {
    const tokenData = await this.verificationTokenService.findValidToken(
      token,
      TokenType.PASSWORD_RESET,
    );

    if (!tokenData) throw new BadRequestException('Token non valido o scaduto');

    await this.accountsService.forceEditPassword(tokenData.email, newPassword);
    await this.verificationTokenService.deleteToken(
      token,
      TokenType.PASSWORD_RESET,
    );

    return { message: 'Password aggiornata con successo!' };
  }
}

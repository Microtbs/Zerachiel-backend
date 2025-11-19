import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountsService } from '../accounts/accounts.service';
import { CreateAccountDto as RegisterDto } from '../accounts/dto/create-account.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleType } from 'src/common/enums/role.enums';
import { MailService } from '../mail/mail.service';
import { RolesService } from '../roles/roles.service';

/**
 * Contiene tutta la business logic di autenticazione:
 * registrazione con verifica e-mail, login JWT e flussi di reset password.
 */
@Injectable()
export class AuthService {
  /**
   * Mappa temporanea dei token di verifica generati lato server.
   * Tenere i dati in memoria consente di ridurre la superficie del DB
   * e applicare facilmente cooldown e scadenze.
   */
  private verificationTokens = new Map<
    number,
    {
      dto: RegisterDto;
      createdAt: number;
      cooldownExpires: number;
    }
  >();

  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
    private mailService: MailService,
    private rolesService: RolesService,
  ) {}

  /**
   * Avvia la registrazione memorizzando temporaneamente la richiesta
   * e inviando un token OTP via e-mail per confermare l'indirizzo.
   */
  async register(dto: RegisterDto) {
    const existing = await this.accountsService
      .findByEmail(dto.email)
      .catch(() => null);
    if (existing) throw new UnauthorizedException('Email già registrata');

    // Controlla se esiste gia' un token per questa email
    const existingAlready = [...this.verificationTokens.values()].find(
      (t) => t.dto.email === dto.email,
    );

    if (existingAlready) {
      const now = Date.now();

      if (existingAlready.cooldownExpires > now) {
        throw new BadRequestException(
          'Hai già richiesto un codice, attendi 2 minuti.',
        );
      }

      // Se il cooldown e' scaduto elimina il vecchio token
      const oldToken = [...this.verificationTokens.entries()].find(
        ([, val]) => val.dto.email === dto.email,
      )?.[0];

      if (oldToken) this.verificationTokens.delete(oldToken);
    }

    // OTP numerico a 6 cifre
    const verificationToken: number = Math.floor(
      100000 + Math.random() * 900000,
    );

    const entry = {
      dto,
      createdAt: Date.now(),
      cooldownExpires: Date.now() + 2 * 60 * 1000,
    };

    this.verificationTokens.set(verificationToken, entry);

    // Massimo una richiesta ogni 2 minuti
    // sblocca il cooldown dopo 2 minuti
    setTimeout(
      () => {
        const current = this.verificationTokens.get(verificationToken);
        if (current && current.cooldownExpires <= Date.now()) {
          current.cooldownExpires = 0;
        }
      },
      2 * 60 * 1000,
    );

    // elimina il token dopo 15 minuti
    setTimeout(
      () => {
        this.verificationTokens.delete(verificationToken);
      },
      15 * 60 * 1000,
    );

    try {
      await this.mailService.sendVerificationEmail(
        dto.email,
        verificationToken,
      );
    } catch (e) {
      throw new BadRequestException('Errore invio email di verifica');
      console.log(e); // Per debug
    }

    return {
      message: 'Abbiamo inviato una mail di verifica nella tua casella.',
    };
  }
  /**
   * Completa la registrazione verificando il token OTP
   * e creando l'account reale su database.
   */
  async verifyEmail(token: number) {
    token = Number(token);
    const tokenData = this.verificationTokens.get(token);

    if (!tokenData) throw new BadRequestException('Token non valido o scaduto');

    const existing = await this.accountsService
      .findByEmail(tokenData.dto.email)
      .catch(() => null);
    if (existing) {
      throw new BadRequestException('Hai già verificato la tua email');
    }

    const hashedPassword = await bcrypt.hash(tokenData.dto.hashed_password, 10);

    const user = await this.accountsService.create({
      first_name: tokenData.dto.first_name,
      last_name: tokenData.dto.last_name,
      email: tokenData.dto.email,
      tax_code: tokenData.dto.tax_code,
      hashed_password: hashedPassword,
      family_member: tokenData.dto.family_member,
    });
    await this.rolesService.createRoleofAccount(user.id, 1); // Assegna ruolo USER di default

    return { message: 'Email verificata con successo!' };
  }

  /**
   * Autentica un utente determinando anche il ruolo più elevato
   * per semplificare l'autorizzazione client-side e server-side.
   */
  async login(dto: LoginDto) {
    const user = await this.accountsService.findByEmail(dto.email);
    const rolePriority: Record<RoleType, number> = {
      [RoleType.USER]: 1,
      [RoleType.CARETAKER]: 2,
      [RoleType.STONEMASON]: 3,
      [RoleType.OFFICER]: 4,
      [RoleType.ADMIN]: 5,
    };
    const roleData = await this.accountsService.getRoleOfAccount(user.id);

    const roles: RoleType[] =
      roleData?.roles?.map((r) => r.type as RoleType) || [];

    if (roles.length === 0) {
      throw new UnauthorizedException('Nessun ruolo assegnato');
    }

    const selectedRole = roles.reduce((prev, curr) => {
      return rolePriority[curr] > rolePriority[prev] ? curr : prev;
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
  /**
   * Mappa i codici one-time per il reset password.
   * Il funzionamento è simile alla verifica email ma salvando solo l'indirizzo.
   */
  private resetTokens = new Map<
    number,
    {
      email: string;
      createdAt: number;
      cooldownExpires: number;
    }
  >();
  async requestPasswordReset(email: string) {
    await this.accountsService.findByEmail(email);

    const existing = [...this.resetTokens.values()].find(
      (t) => t.email === email,
    );
    if (existing && existing.cooldownExpires > Date.now()) {
      throw new BadRequestException(
        'Hai già richiesto un codice, attendi 2 minuti.',
      );
    }

    const oldToken = [...this.resetTokens.entries()].find(
      ([, t]) => t.email === email,
    )?.[0];
    if (oldToken) this.resetTokens.delete(oldToken);

    const token = Math.floor(100000 + Math.random() * 900000);
    this.resetTokens.set(token, {
      email,
      createdAt: Date.now(),
      cooldownExpires: Date.now() + 2 * 60 * 1000,
    });

    setTimeout(() => this.resetTokens.delete(token), 15 * 60 * 1000);

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
    const entry = this.resetTokens.get(token);
    if (!entry) throw new BadRequestException('Token non valido o scaduto');

    await this.accountsService.forceEditPassword(entry.email, newPassword);

    this.resetTokens.delete(token);

    return { message: 'Password aggiornata con successo!' };
  }
}

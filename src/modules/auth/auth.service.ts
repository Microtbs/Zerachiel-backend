import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountsService } from '../accounts/accounts.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.accountsService
      .findByEmail(dto.email)
      .catch(() => null);
    if (existing) throw new UnauthorizedException('Email già registrata');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Costruisco tutto l'oggetto CreateUserDto, con la password hashata
    const user = await this.accountsService.create({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      tax_code: dto.tax_code,
      hashed_password: hashedPassword,
      family_member: dto.family_member,
    });

    return { message: 'Registrazione completata', id: user.id };
  }

  async login(dto: LoginDto) {
    const user = await this.accountsService.findByEmail(dto.email);
    const isValid = await bcrypt.compare(dto.password, user.hashed_password);
    if (!isValid) throw new UnauthorizedException('Credenziali errate');

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      tax_code: user.tax_code,
      family_member: user.family_member,
    };
  }
}

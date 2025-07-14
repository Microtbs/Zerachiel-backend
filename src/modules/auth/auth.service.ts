import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
  const existing = await this.usersService.findByEmail(dto.email).catch(() => null);
  if (existing) throw new UnauthorizedException('Email già registrata');

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  // Costruisco tutto l'oggetto CreateUserDto, con la password hashata
  const user = await this.usersService.create({
    first_name: dto.first_name,
    last_name: dto.last_name,
    email: dto.email,
    tax_code: dto.tax_code,
    password: hashedPassword,
    family_member: dto.family_member,
  });

  return { message: 'Registrazione completata', id: user.id };
}


  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Credenziali errate');

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountsService } from '../accounts/accounts.service';
import { CreateAccountDto as RegisterDto } from '../accounts/dto/create-account.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RoleType } from 'src/common/enums/role.enums';

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

    const hashedPassword = await bcrypt.hash(dto.hashed_password, 10);

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
    const rolePriority: Record<RoleType, number> = {
      [RoleType.USER]: 1,
      [RoleType.CARETAKER]: 2,
      [RoleType.STONEMASON]: 3,
      [RoleType.OFFICER]: 4,
    };
    const roleData = await this.accountsService.getRoleOfAccount(user.id);

    const roles: RoleType[] =
      roleData?.roles?.map((r) => r.type as RoleType) || [];

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
}

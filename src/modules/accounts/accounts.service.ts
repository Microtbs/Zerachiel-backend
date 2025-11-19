import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto, UpdateSensitiveDto } from './dto/update-account.dto';
import { AccountResponseDTO } from './dto/account-response.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';

/**
 * Servizio applicativo responsabile della gestione degli account
 * (registrazione, profili, ruoli e dati sensibili come email/password).
 */
@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @Inject(forwardRef(() => RolesService)) private rolesService: RolesService,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    const user = this.repo.create(createAccountDto);
    return this.repo.save(user);
  }

  findAll(): Promise<Account[]> {
    return this.repo.find();
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await this.repo.findOne({ where: { email } });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  /**
   * Recupera l'account con i ruoli associati e li serializza
   * in un DTO minimale da esporre verso i client o altri servizi.
   */
  async getRoleOfAccount(id: number): Promise<AccountResponseDTO> {
    const account = await this.repo.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
    });
    if (!account) throw new NotFoundException('Account not found');
    const dto: AccountResponseDTO = {
      id: account.id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      roles: account.userRoles.map((ur) => ({
        id: ur.role.id,
        type: ur.role.type,
        details: ur.role.details,
      })),
    };
    return dto;
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.repo.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!account) throw new NotFoundException('Account not found');
    return account;
  }
  /**
   * Aggiorna la password verificando l'attuale hash e ricalcolandone uno nuovo.
   * Utilizzato dal profilo utente dopo autenticazione.
   */
  async editPassword(id: number, updateAccountDto: UpdateSensitiveDto) {
    const { currentPassword, newPassword } = updateAccountDto;
    const account = await this.repo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');

    if (!currentPassword || !newPassword) {
      throw new BadRequestException('Missing current or new password');
    }

    const isValid = await bcrypt.compare(
      currentPassword,
      account.hashed_password,
    );

    if (!isValid) throw new UnauthorizedException('Invalid current password');

    account.hashed_password = await bcrypt.hash(newPassword, 10);
    return {
      message: 'Password updated successfully',
      account: await this.repo.save(account),
    };
  }

  /**
   * Metodo usato esclusivamente dal flusso di recupero password (mail).
   * Forza l'aggiornamento dell'hash conoscendo solo l'email.
   */
  async forceEditPassword(email: string, newPassword: string) {
    const account = await this.repo.findOne({ where: { email } });
    if (!account) throw new NotFoundException('Account not found');

    account.hashed_password = await bcrypt.hash(newPassword, 10);

    await this.repo.save(account);

    return {
      message: 'Password updated successfully',
    };
  }

  async editEmail(id: number, updateAccountDto: UpdateSensitiveDto) {
    const { newEmail } = updateAccountDto;
    if (!newEmail) {
      throw new BadRequestException('Missing new email');
    }
    const account = await this.repo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    account.email = newEmail;
    const accountEdited = await this.repo.save(account);
    return {
      message: 'Email updated successfully',
      account: {
        id: accountEdited.id,
        first_name: accountEdited.first_name,
        last_name: accountEdited.last_name,
        email: accountEdited.email,
      } as AccountResponseDTO,
    };
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.repo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    return this.repo.save({ id, ...updateAccountDto });
  }
  // prima rimuovi ruolo da removeRoleOfAccount si role.service e poi rimuovi account
  async remove(id: number): Promise<{ message: string }> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    await this.rolesService.removeRoleOfAccount(id);
    await this.repo.delete(id);
    return {
      message: 'Account removed successfully',
    };
  }
}

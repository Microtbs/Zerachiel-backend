import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto, UpdateSensitiveDto } from './dto/update-account.dto';
import { AccountResponseDTO } from './dto/account-response.dto';
import { AccountMapper } from './mappers/account.mapper';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '@@/pagination/dto/pagination.dto';
import { PaginatedResponse } from '@@/pagination/interfaces/paginated-response.interface';
import { BCRYPT_ROUNDS } from '../../common/constants/auth.constants';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private readonly repo: Repository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    const user = this.repo.create(createAccountDto);
    return this.repo.save(user);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<AccountResponseDTO>> {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [accounts, total] = await this.repo.findAndCount({
      relations: ['userRoles', 'userRoles.role'],
      skip,
      take: limit,
    });

    const data = AccountMapper.toResponseList(accounts);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await this.repo.findOne({ where: { email } });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async getRoleOfAccount(id: number): Promise<AccountResponseDTO> {
    const account = await this.repo.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
    });
    if (!account) throw new NotFoundException('Account not found');
    return AccountMapper.toResponse(account);
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.repo.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!account) throw new NotFoundException('Account not found');
    return account;
  }
  async editPassword(id: number, updateAccountDto: UpdateSensitiveDto) {
    const { currentPassword, newPassword } = updateAccountDto;
    const account = await this.repo.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
    });
    if (!account) throw new NotFoundException('Account not found');

    if (!currentPassword || !newPassword) {
      throw new BadRequestException('Missing current or new password');
    }

    const isValid = await bcrypt.compare(
      currentPassword,
      account.hashed_password,
    );

    if (!isValid) throw new UnauthorizedException('Invalid current password');

    account.hashed_password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    const updatedAccount = await this.repo.save(account);

    return {
      message: 'Password updated successfully',
      account: AccountMapper.toResponse(updatedAccount),
    };
  }

  async forceEditPassword(email: string, newPassword: string) {
    const account = await this.repo.findOne({ where: { email } });
    if (!account) throw new NotFoundException('Account not found');

    account.hashed_password = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

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
    const account = await this.repo.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
    });
    if (!account) throw new NotFoundException('Account not found');
    account.email = newEmail;
    const accountEdited = await this.repo.save(account);
    return {
      message: 'Email updated successfully',
      account: AccountMapper.toResponse(accountEdited),
    };
  }

  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<AccountResponseDTO> {
    const account = await this.repo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    await this.repo.save({ id, ...updateAccountDto });

    const accountWithRelations = await this.repo.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role'],
    });

    if (!accountWithRelations) {
      throw new NotFoundException('Account not found after update');
    }

    return AccountMapper.toResponse(accountWithRelations);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    await this.repo.delete(id);
    return {
      message: 'Account removed successfully',
    };
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UserRole } from './entities/user_role.entity';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) throw new NotFoundException('role not found');
    return role;
  }

  /*async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }*/

  async createRoleofAccount(
    account_id: number,
    role_id: number,
  ): Promise<UserRole> {
    const account = await this.accountRepository.findOneBy({ id: account_id });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const role = await this.roleRepository.findOneBy({ id: role_id });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const existingUserRole = await this.userRoleRepository.findOne({
      where: {
        account: { id: account_id },
        role: { id: role_id },
      },
    });

    if (existingUserRole) {
      throw new BadRequestException('Role already assigned to the account');
    }

    const userRole = this.userRoleRepository.create({
      account: { id: account_id },
      role: { id: role_id },
    });
    return this.userRoleRepository.save(userRole);
  }

  async update(
    id: number,
    updateRoleDto: Partial<CreateRoleDto>,
  ): Promise<Role> {
    await this.roleRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
  async removeRoleOfAccount(account_id: number): Promise<void> {
    await this.userRoleRepository.delete({
      account: { id: account_id },
    });
  }
}

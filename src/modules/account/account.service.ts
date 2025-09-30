import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Account } from "./entities/account.entity"
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {

  constructor(@InjectRepository(Account) private readonly repo: Repository<Account>) { }

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

  async findOne(id: number): Promise<Account> {
    const account = await this.repo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.repo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    return this.repo.save({ id, ...updateAccountDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return this.repo.delete(id);
  }
}
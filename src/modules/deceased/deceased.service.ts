import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Deceased } from './entities/deceased.entity';

import { CreateDeceasedDto } from './dto/create-deceased.dto';
import { UpdateDeceasedDto } from './dto/update-deceased.dto';

/**
 * CRUD service per i defunti indicizzati nel sistema.
 */
@Injectable()
export class DeceasedService {
  constructor(
    @InjectRepository(Deceased) private readonly repo: Repository<Deceased>,
  ) {}

  create(createUserDto: CreateDeceasedDto): Promise<Deceased> {
    const deceased = this.repo.create(createUserDto);
    return this.repo.save(deceased);
  }

  findAll(): Promise<Deceased[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Deceased> {
    const deceased = await this.repo.findOneBy({ id });
    if (!deceased) throw new NotFoundException('Deceased not found');
    return deceased;
  }
  async update(
    id: number,
    updateDeceasedDto: UpdateDeceasedDto,
  ): Promise<Deceased> {
    const deceased = await this.repo.findOneBy({ id });
    if (!deceased) throw new NotFoundException('Deceased not found');
    return this.repo.save({ id, ...updateDeceasedDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const deceased = await this.repo.findOneBy({ id });
    if (!deceased) throw new NotFoundException('Deceased not found');
    return this.repo.delete(id);
  }
}

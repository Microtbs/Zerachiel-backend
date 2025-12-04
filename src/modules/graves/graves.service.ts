import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Grave } from './entities/grave.entity';
import { CreateGravesDto } from './dto/create-graves.dto';
import { UpdateGravesDto } from './dto/update-graves.dto';
import { PaginationDto } from '@@/pagination/dto/pagination.dto';
import { PaginatedResponse } from '@@/pagination/interfaces/paginated-response.interface';

@Injectable()
export class GravesService {
  constructor(
    @InjectRepository(Grave) private readonly repo: Repository<Grave>,
  ) {}

  create(createGraveDto: CreateGravesDto): Promise<Grave> {
    const Grave = this.repo.create(createGraveDto);
    return this.repo.save(Grave);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Grave>> {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.repo.findAndCount({
      skip,
      take: limit,
    });

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

  async findOne(id: number): Promise<Grave> {
    const Grave = await this.repo.findOneBy({ id });
    if (!Grave) throw new NotFoundException('Grave not found');
    return Grave;
  }

  async update(id: number, updateGraveDto: UpdateGravesDto): Promise<Grave> {
    const Grave = await this.repo.findOneBy({ id });
    if (!Grave) throw new NotFoundException('Grave not found');
    return this.repo.save({ id, ...updateGraveDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const Grave = await this.repo.findOneBy({ id });
    if (!Grave) throw new NotFoundException('Grave not found');
    return this.repo.delete(id);
  }
}

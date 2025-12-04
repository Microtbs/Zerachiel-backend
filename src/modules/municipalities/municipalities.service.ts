import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipality } from './entities/municipality.entity';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { PaginationDto } from '@@/pagination/dto/pagination.dto';
import { PaginatedResponse } from '@@/pagination/interfaces/paginated-response.interface';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipality)
    private readonly municipalityRepo: Repository<Municipality>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Municipality>> {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.municipalityRepo.findAndCount({
      relations: ['contact', 'requestOffices'],
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

  async findOne(id: number): Promise<Municipality> {
    const municipality = await this.municipalityRepo.findOne({
      where: { id },
      relations: ['contact', 'requestOffices'],
    });
    if (!municipality) {
      throw new NotFoundException(`Municipality with ID ${id} not found`);
    }
    return municipality;
  }

  async create(dto: CreateMunicipalityDto): Promise<Municipality> {
    const municipality = this.municipalityRepo.create(dto);
    return this.municipalityRepo.save(municipality);
  }

  async update(id: number, dto: UpdateMunicipalityDto): Promise<Municipality> {
    const municipality = await this.findOne(id);
    Object.assign(municipality, dto);
    return this.municipalityRepo.save(municipality);
  }

  async remove(id: number): Promise<void> {
    const municipality = await this.findOne(id);
    await this.municipalityRepo.remove(municipality);
  }
}

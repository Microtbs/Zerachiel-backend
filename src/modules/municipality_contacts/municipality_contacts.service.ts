import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MunicipalityContact } from './entities/municipality_contact.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMunicipalityContactDto } from './dto/create-municipality_contact.dto';
import { UpdateMunicipalityContactDto } from './dto/update-municipality_contact.dto';
import { PaginationDto } from '@@/pagination/dto/pagination.dto';
import { PaginatedResponse } from '@@/pagination/interfaces/paginated-response.interface';

@Injectable()
export class MunicipalityContactsService {
  constructor(
    @InjectRepository(MunicipalityContact)
    private readonly repo: Repository<MunicipalityContact>,
  ) {}

  create(
    createMunicipalityContactDto: CreateMunicipalityContactDto,
  ): Promise<MunicipalityContact> {
    const municipalityContact = this.repo.create(createMunicipalityContactDto);
    return this.repo.save(municipalityContact);
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<MunicipalityContact>> {
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

  async findOne(id: number): Promise<MunicipalityContact> {
    const municipalityContact = await this.repo.findOneBy({ id });
    if (!municipalityContact)
      throw new NotFoundException('Municipality contact not found');
    return municipalityContact;
  }

  async update(
    id: number,
    updateMunicipalityContactDto: UpdateMunicipalityContactDto,
  ): Promise<MunicipalityContact> {
    const municipalityContact = await this.repo.findOneBy({ id });
    if (!municipalityContact)
      throw new NotFoundException('Municipality contact not found');
    return this.repo.save({ id, ...updateMunicipalityContactDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const municipalityContact = await this.repo.findOneBy({ id });
    if (!municipalityContact)
      throw new NotFoundException('Municipality contact not found');
    return this.repo.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipality } from './entities/municipality.entity';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipality)
    private readonly repo: Repository<Municipality>,
  ) {}

  findAll(): Promise<Municipality[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Municipality> {
    const municipality = await this.repo.findOneBy({ id });
    if (!municipality) throw new NotFoundException('Municipality not found');
    return municipality;
  }

  create(dto: CreateMunicipalityDto): Promise<Municipality> {
    const municipality = this.repo.create(dto);
    return this.repo.save(municipality);
  }

  async update(id: number, dto: UpdateMunicipalityDto): Promise<Municipality> {
    const municipality = await this.findOne(id);
    Object.assign(municipality, dto);
    return this.repo.save(municipality);
  }

  async remove(id: number): Promise<void> {
    const municipality = await this.findOne(id);
    await this.repo.remove(municipality);
  }
}

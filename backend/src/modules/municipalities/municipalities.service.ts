import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipalities } from './entities/municipality.entity';
import { MunicipalitiesController } from './municipalities.controller';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipalities)
    private readonly repo: Repository<Municipalities>,
  ) {}

  findAll(): Promise<Municipalities[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Municipalities> {
    const municipality = await this.repo.findOneBy({ id });
    if (!municipality) throw new NotFoundException('Municipality not found');
    return municipality;
  }

  create(dto: CreateMunicipalityDto): Promise<Municipalities> {
    const municipality = this.repo.create(dto);
    return this.repo.save(municipality);
  }

  async update(id: number, dto: UpdateMunicipalityDto): Promise<Municipalities> {
  const municipality = await this.findOne(id);
  Object.assign(municipality, dto);
  return this.repo.save(municipality);
  }

  async remove(id: number): Promise<void> {
  const municipality = await this.findOne(id);
  await this.repo.remove(municipality);
  }

}

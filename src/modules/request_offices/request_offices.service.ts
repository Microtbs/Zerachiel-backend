import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestOffice } from './entities/request_office.entity';
import { CreateRequestOfficeDto } from './dto/create-request_office.dto';
import { UpdateRequestOfficeDto } from './dto/update-request_office.dto';
import { Municipality } from '../municipalities/entities/municipality.entity';

/**
 * Gestisce gli uffici comunali responsabili delle richieste sul cimitero.
 */
@Injectable()
export class RequestOfficesService {
  constructor(
    @InjectRepository(RequestOffice)
    private readonly requestOfficeRepo: Repository<RequestOffice>,
    @InjectRepository(Municipality)
    private readonly municipalityRepo: Repository<Municipality>,
  ) {}

  async create(dto: CreateRequestOfficeDto): Promise<RequestOffice> {
    const municipality = await this.municipalityRepo.findOne({
      where: { id: dto.id_municipality },
    });
    if (!municipality) throw new NotFoundException('Municipality not found');

    const office = this.requestOfficeRepo.create({
      name: dto.name,
      address: dto.address,
      municipality,
    });

    return this.requestOfficeRepo.save(office);
  }

  findAll(): Promise<RequestOffice[]> {
    return this.requestOfficeRepo.find({ relations: ['municipality'] });
  }

  async findOne(id: number): Promise<RequestOffice> {
    const office = await this.requestOfficeRepo.findOne({
      where: { id },
      relations: ['municipality'],
    });
    if (!office) throw new NotFoundException('RequestOffice not found');
    return office;
  }

  async update(
    id: number,
    dto: UpdateRequestOfficeDto,
  ): Promise<RequestOffice> {
    const office = await this.findOne(id);

    if (dto.id_municipality) {
      const municipality = await this.municipalityRepo.findOne({
        where: { id: dto.id_municipality },
      });
      if (!municipality) throw new NotFoundException('Municipality not found');
      office.municipality = municipality;
    }

    if (dto.name !== undefined) office.name = dto.name;
    if (dto.address !== undefined) office.address = dto.address;

    return this.requestOfficeRepo.save(office);
  }

  async remove(id: number): Promise<void> {
    const office = await this.findOne(id);
    await this.requestOfficeRepo.remove(office);
  }
}

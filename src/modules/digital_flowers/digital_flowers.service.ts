import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DigitalFlower } from './entities/digital_flower.entity';
import { CreateDigitalFlowersDto } from './dto/create-digital_flower.dto';
import { UpdateDigitalFlowersDto } from './dto/update-digital_flower.dto';

@Injectable()
export class DigitalFlowersService {
  constructor(
    @InjectRepository(DigitalFlower)
    private readonly repo: Repository<DigitalFlower>,
  ) {}

  findAll(): Promise<DigitalFlower[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<DigitalFlower> {
    const flower = await this.repo.findOneBy({ id });
    if (!flower) throw new NotFoundException('Digital flowers not found');
    return flower;
  }

  async create(dto: CreateDigitalFlowersDto): Promise<DigitalFlower> {
    const flower = this.repo.create({
      type: dto.type,
      created_at: dto.duration,
      sender: { id: dto.account_id },
      grave: { id: dto.grave_id },
    });

    return this.repo.save(flower);
  }

  async remove(id: number): Promise<void> {
    const flower = await this.findOne(id);
    await this.repo.remove(flower);
  }

  async update(
    id: number,
    dto: UpdateDigitalFlowersDto,
  ): Promise<DigitalFlower> {
    const flower = await this.findOne(id);
    Object.assign(flower, dto);
    return this.repo.save(flower);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DigitalFlower } from './entities/digital_flower.entity';
import { CreateDigitalFlowersDto } from './dto/create-digital_flower.dto';
import { UpdateDigitalFlowersDto } from './dto/update-digital_flower.dto';
import { DigitalFlowerResponseDTO } from './dto/digital_flower-response.dto';
@Injectable()
export class DigitalFlowersService {
  constructor(
    @InjectRepository(DigitalFlower)
    private readonly repo: Repository<DigitalFlower>,
  ) {}

  async findAll(): Promise<DigitalFlowerResponseDTO[]> {
    const digitalFlowers = await this.repo.find({
      relations: ['sender', 'grave', 'grave.deceased'],
    });

    const result: DigitalFlowerResponseDTO[] = digitalFlowers.map((flower) => ({
      id: flower.id,
      type: flower.type,
      created_at: flower.createdAt,
      sender: {
        id: flower.sender.id,
        first_name: flower.sender.first_name,
        last_name: flower.sender.last_name,
      },
      grave: {
        id: flower.grave.id,
        deceased: flower.grave.deceased.map((d) => ({
          first_name: d.firstName,
          last_name: d.lastName,
        })),
      },
    }));

    return result;
  }

  async findOne(id: number): Promise<DigitalFlower> {
    const flower = await this.repo.findOneBy({ id });
    if (!flower) throw new NotFoundException('Digital flowers not found');
    return flower;
  }

  async create(dto: CreateDigitalFlowersDto): Promise<DigitalFlower> {
    const flower = this.repo.create({
      type: dto.type,
      createdAt: dto.duration,
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Grave } from './entities/graves.entity';
import { CreateGravesDto } from './dto/create-graves.dto';
import { UpdateGravesDto } from './dto/update-graves.dto';

@Injectable()
export class GravesService {
  constructor(
    @InjectRepository(Grave) private readonly repo: Repository<Grave>,
  ) {}

  create(createGraveDto: CreateGravesDto): Promise<Grave> {
    const Grave = this.repo.create(createGraveDto);
    return this.repo.save(Grave);
  }

  findAll(): Promise<Grave[]> {
    return this.repo.find();
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

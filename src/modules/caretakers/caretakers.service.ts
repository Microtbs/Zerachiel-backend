import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateCaretakerDto } from './dto/create-caretaker.dto';
import { UpdateCaretakerDto } from './dto/update-caretaker.dto';
import { Caretaker } from './entities/caretakers.entity';

@Injectable()
export class CaretakersService {
  constructor(@InjectRepository(Caretaker) private readonly repo: Repository<Caretaker>) { }

  create(createCaretakerDto: CreateCaretakerDto): Promise<Caretaker> {
    const Caretaker = this.repo.create(createCaretakerDto);
    return this.repo.save(Caretaker);
  }

  findAll(): Promise<Caretaker[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Caretaker> {
    const Caretaker = await this.repo.findOneBy({ id });
    if (!Caretaker) throw new NotFoundException('Caretaker not found');
    return Caretaker;
  }

  async update(id: number, updateCaretakerDto: UpdateCaretakerDto): Promise<Caretaker> {
    const Caretaker = await this.repo.findOneBy({ id });
    if (!Caretaker) throw new NotFoundException('Caretaker not found');
    return this.repo.save({ id, ...updateCaretakerDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const Caretaker = await this.repo.findOneBy({ id });
    if (!Caretaker) throw new NotFoundException('Caretaker not found');
    return this.repo.delete(id);
  }
}

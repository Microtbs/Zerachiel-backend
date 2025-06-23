import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grave } from './entities/graves.entity';
import { CreateGravesDto } from './dto/create-graves.dto';
import { UpdateGravesDto } from './dto/update-graves.dto';


@Injectable()
export class GravesService {
    constructor(
        @InjectRepository(Grave)
        private graveRepository: Repository<Grave>,
    ) { }

    create(dto: CreateGravesDto) {
        const graves = this.graveRepository.create({
            ...dto,
            caretakers: { id: dto.caretaker_id },
        });
        return this.graveRepository.save(graves);
    }

    findAll() {
        return this.graveRepository.find({ relations: ['caretaker'] });
    }

    findOne(id: number) {
        return this.graveRepository.findOne({ where: { id }, relations: ['caretaker'] });
    }

    async update(id: number, dto: UpdateGravesDto) {
        const data = {
            ...dto,
            caretaker: dto.caretaker_id ? { id: dto.caretaker_id } : undefined,
        };
        await this.graveRepository.update(id, data);
        return this.findOne(id);
    }

    remove(id: number) {
        return this.graveRepository.delete(id);
    }
}


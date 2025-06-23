import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MunicipalityContact } from './entities/municipality_contacts.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMunicipalityContactDto } from './dto/create-municipality_contact.dto';
import { UpdateMunicipalityContactDto } from './dto/update-municipality_contact.dto';

@Injectable()
export class MunicipalityContactsService {
    constructor(@InjectRepository(MunicipalityContact) private readonly repo: Repository<MunicipalityContact>) { }

    create(createMunicipalityContactDto: CreateMunicipalityContactDto): Promise<MunicipalityContact> {
        const municipalityContact = this.repo.create(createMunicipalityContactDto);
        return this.repo.save(municipalityContact);
    }

    findAll(): Promise<MunicipalityContact[]> {
        return this.repo.find();
    }

    async findOne(id: number): Promise<MunicipalityContact> {
        const municipalityContact = await this.repo.findOneBy({ id });
        if (!municipalityContact) throw new Error('Municipality contact not found');
        return municipalityContact;
    }

    async update(id: number, updateMunicipalityContactDto: UpdateMunicipalityContactDto): Promise<MunicipalityContact> {
        const municipalityContact = await this.repo.findOneBy({ id });
        if (!municipalityContact) throw new Error('Municipality contact not found');
        return this.repo.save({ id, ...updateMunicipalityContactDto });
    }

    async remove(id: number): Promise<DeleteResult> {
        const municipalityContact = await this.repo.findOneBy({ id });
        if (!municipalityContact) throw new Error('Municipality contact not found');
        return this.repo.delete(id);
    }
}

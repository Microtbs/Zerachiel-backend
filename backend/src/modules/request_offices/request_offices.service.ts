import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestOffice } from './entities/request_office.entity';
import { CreateRequestOfficeDto } from './dto/create-request_office.dto';
import { UpdateRequestOfficeDto } from './dto/update-request_office.dto';

import { Grave } from '../graves/entities/graves.entity';
import { Municipalities } from '../municipalities/entities/municipalities.entity';

@Injectable()
export class RequestOfficesService {
  constructor(
    @InjectRepository(RequestOffice)
    private readonly requestOfficeRepository: Repository<RequestOffice>,

    @InjectRepository(Grave)
    private readonly graveRepository: Repository<Grave>,

    @InjectRepository(Municipalities)
    private readonly municipalitiesRepository: Repository<Municipalities>,
  ) {}

  /**
   * Trova un municipio per ID.
   * @param id - ID del municipio da trovare.
   * @returns Il municipio trovato.
   * */
  private async findMunicipalityBy(id: number): Promise<Municipalities> {
    const municipality = await this.municipalitiesRepository.findOne({
      where: { id: id },
    });
    if (!municipality)
      throw new NotFoundException('Ops... Municipio non trovato :(');

    return municipality;
  }

  /**
   * Trova una tomba per ID.
   * @param id - ID della tomba da trovare.
   * @returns La tomba trovata.
   */
  private async findGraveBy(id: number): Promise<Grave> {
    const grave = await this.graveRepository.findOne({
      where: { id: id },
    });
    if (!grave) throw new NotFoundException('Ops... Tomba non trovata :(');
    return grave;
  }

  /**
   * Crea una nuova richiesta associata a un ufficio richieste e a una tomba.
   * @param createRequestOfficeDto - Dati dell'ufficio richieste da creare.
   * @returns L'ufficio richieste creato.
   */
  async create(
    createRequestOfficeDto: CreateRequestOfficeDto,
  ): Promise<RequestOffice> {
    const grave = await this.findGraveBy(createRequestOfficeDto.grave_id); // Trovare la tomba associata tramite un metodo private

    const municipality = await this.findMunicipalityBy(
      createRequestOfficeDto.municipality_id,
    ); // Trovare il municipio associato tramite un metodo private

    const requestOffice = this.requestOfficeRepository.create({
      requests_processed: createRequestOfficeDto.requests_processed,
      grave,
      municipality,
    });

    return this.requestOfficeRepository.save(requestOffice);
  }

  async findAll(): Promise<RequestOffice[]> {
    return this.requestOfficeRepository.find();
  }

  async findOne(id: number): Promise<RequestOffice> {
    const office = await this.requestOfficeRepository.findOne({
      where: { id },
      relations: ['municipality', 'grave'], // Ti mostra anche le relazioni
    });
    if (!office) throw new NotFoundException('Ops... Richiesta non trovata :(');
    return office;
  }

  /**
   * Aggiorna un ufficio richeiste esistente.
   * @param id - ID dell'ufficio richieste da aggiornare.
   * @param updateRequestOfficeDto - Dati di aggiornamento dell'ufficio Richieste.
   * @returns L'ufficio richieste aggiornato.
   */
  async update(
    id: number,
    updateRequestOfficeDto: UpdateRequestOfficeDto,
  ): Promise<RequestOffice> {
    const office = await this.findOne(id);

    // Se l'ID della tomba è fornito, aggiorna la tomba associata
    if (updateRequestOfficeDto.grave_id) {
      office.grave = await this.findGraveBy(updateRequestOfficeDto.grave_id);
    }

    // Se l'ID del municipio è fornito, aggiorna il municipio associato
    if (updateRequestOfficeDto.municipality_id) {
      office.municipality = await this.findMunicipalityBy(
        updateRequestOfficeDto.municipality_id,
      );
    }

    if (typeof updateRequestOfficeDto.requests_processed === 'boolean') {
      office.requests_processed = updateRequestOfficeDto.requests_processed;
    }

    return this.requestOfficeRepository.save(office);
  }

  /**
   * Rimuove un ufficio richieste per ID.
   * @param id - ID dell'ufficio richieste da rimuovere.
   */
  async remove(id: number): Promise<void> {
    const result = await this.requestOfficeRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(
        `Ops... Ufficio Richieste con l\'id ${id} non trovato :(`,
      );
  }
}

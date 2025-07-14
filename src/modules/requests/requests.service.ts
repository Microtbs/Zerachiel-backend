import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

import { User } from '../users/entities/user.entity';
import { RequestOffice } from '../request_offices/entities/request_office.entity'; //   TODO :Fare Entità

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(RequestOffice)
    private readonly requestOfficeRepository: Repository<RequestOffice>,
  ) {}

  /**
   * Trova un utente per ID.
   * @param id - ID dell'utente da trovare.
   * @returns L'utente trovato.
   */
  private async findUserBy(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) throw new NotFoundException('Ops... Utente non trovato :(');

    return user;
  }

  /**
   * Trova un ufficio richieste per ID.
   * @param id - ID dell'ufficio richieste da trovare.
   * @returns L'ufficio richieste trovato.
   */
  private async findRequestOfficeBy(id: number): Promise<RequestOffice> {
    const office = await this.requestOfficeRepository.findOne({
      where: { id: id },
    });
    if (!office)
      throw new NotFoundException('Ops... Ufficio Richieste non trovato :(');
    return office;
  }

  /**
   * Crea una nuova richiesta associata a un utente e a un ufficio richieste.
   * @param createRequestDto - Dati della richiesta da creare.
   * @returns La richiesta creata.
   */
  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const user = await this.findUserBy(createRequestDto.user_id); // Trovare l'utente associato tramite un metodo private

    const office = await this.findRequestOfficeBy(
      createRequestDto.request_office_id,
    ); // Trovare l'ufficio richieste associato tramite un metodo private

    // Creare una nuova richiesta
    const request = this.requestRepository.create({
      submitted: createRequestDto.submitted,
      accepted: createRequestDto.accepted,
      user,
      requestOffice: office,
    }); // Associa l'utente e l'ufficio richieste
    return this.requestRepository.save(request);
  }

  /**
   * Trova tutte le richieste, unendo le tabelle degli utenti e degli uffici richieste.
   * @returns Un array di richieste con le relazioni caricate.
   */
  async findAll(): Promise<Request[]> {
    return this.requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user') // Unisce la tabella degli utenti
      .leftJoinAndSelect('request.requestOffice', 'requestOffice') // Unisce la tabella degli uffici richieste
      .orderBy('request.id', 'ASC') // Ordina per cognome utente
      .getMany();
  }

  /**
   * Trova una richiesta specifica per ID, caricando le relazioni con l'utente e l'ufficio richieste.
   * @param id - ID della richiesta da trovare.
   * @returns La richiesta trovata.
   */
  async findOne(id: number): Promise<Request> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['user', 'requestOffice'], // Ti mostra anche le relazioni
    });
    if (!request)
      throw new NotFoundException('Ops... Richiesta non trovata :(');
    return request;
  }

  /**
   * Aggiorna una richiesta esistente.
   * @param id - ID della richiesta da aggiornare.
   * @param updateRequestDto - Dati di aggiornamento della richiesta.
   * @returns La richiesta aggiornata.
   */
  async update(
    id: number,
    updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    const request = await this.findOne(id);

    // Se l'ID dell'utente è fornito, trova l'utente e aggiorna la richiesta
    // updateRequestDto.userId ? (request.user = await this.findUserBy(updateRequestDto.userId)) : null;

    if (updateRequestDto.user_id) {
      request.user = await this.findUserBy(updateRequestDto.user_id);
    }

    // Se l'ID dell'ufficio richieste è fornito, trova l'ufficio richieste e aggiorna la richiesta
    // updateRequestDto.requestOfficeId? (request.requestOffice = await this.findRequestOfficeBy(updateRequestDto.requestOfficeId)) : null;

    if (updateRequestDto.request_office_id) {
      request.requestOffice = await this.findRequestOfficeBy(
        updateRequestDto.request_office_id,
      );
    }

    if (typeof updateRequestDto.submitted === 'boolean') {
      request.submitted = updateRequestDto.submitted;
    }

    if (typeof updateRequestDto.accepted === 'boolean') {
      request.accepted = updateRequestDto.accepted;
    }

    return this.requestRepository.save(request);
  }

  /**
   * Rimuove una richiesta per ID.
   * @param id - ID della richiesta da rimuovere.
   * @returns un messaggio di successo o un errore se la richiesta non esiste.
   */
  async remove(id: number): Promise<void> {
    await this.requestRepository.delete(id);
  }
}

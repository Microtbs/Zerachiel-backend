import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

import { User } from '../users/entities/user.entity';
import { RequestOffice } from '../request_offices/entities/request_office.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,

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
   * Crea un nuovo feedback associata a un utente e a un ufficio richieste.
   * @param createFeedbackDto - Dati della richiesta da creare.
   * @returns La richiesta creata.
   */
  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const user = await this.findUserBy(createFeedbackDto.user_id); // Trovare l'utente associato tramite un metodo private

    const office = await this.findRequestOfficeBy(
      createFeedbackDto.request_office_id,
    ); // Trovare l'ufficio richieste associato tramite un metodo private

    // Creare una nuova richiesta
    const request = this.feedbackRepository.create({
      details: createFeedbackDto.details,
      user,
      requestOffice: office,
    }); // Associa l'utente e l'ufficio richieste
    return this.feedbackRepository.save(request);
  }

  /**
   * Trova tutti i feedbacks, unendo le tabelle degli utenti e degli uffici richieste.
   * @returns Un array di feedbacks con le relazioni caricate.
   */
  async findAll(): Promise<Feedback[]> {
    return this.feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.user', 'user') // Unisce la tabella degli utenti
      .leftJoinAndSelect('feedback.requestOffice', 'requestOffice') // Unisce la tabella degli uffici richieste
      .orderBy('feedback.id', 'ASC') // Ordina per id
      .getMany();
  }

  /**
   * Trova un feedback specifico per ID, caricando le relazioni con l'utente e l'ufficio richieste.
   * @param id - ID del feedback da trovare.
   * @returns Il feedback trovato.
   */
  async findOne(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['user', 'requestOffice'], // Ti mostra anche le relazioni
    });
    if (!feedback)
      throw new NotFoundException('Ops... Feedback non trovato :(');
    return feedback;
  }

  /**
   * Aggiorna un feedback esistente.
   * @param id - ID del feedback da aggiornare.
   * @param updateFeedbackDto - Dati di aggiornamento del feedback.
   * @returns Il feedback aggiornata.
   */
  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    const feedback = await this.findOne(id);

    // Se l'ID dell'utente è fornito, trova l'utente e aggiorna il feedback

    if (updateFeedbackDto.user_id) {
      feedback.user = await this.findUserBy(updateFeedbackDto.user_id);
    }

    // Se l'ID dell'ufficio richieste è fornito, trova l'ufficio richieste e aggiorna il feedback

    if (updateFeedbackDto.request_office_id) {
      feedback.requestOffice = await this.findRequestOfficeBy(
        updateFeedbackDto.request_office_id,
      );
    }

    if (typeof updateFeedbackDto.details === 'string') {
      feedback.details = updateFeedbackDto.details;
    }

    return this.feedbackRepository.save(feedback);
  }

  /**
   * Rimuove un feedback per ID.
   * @param id - ID del feedback da rimuovere.
   */
  async remove(id: number): Promise<void> {
    await this.feedbackRepository.delete(id);
  }
}

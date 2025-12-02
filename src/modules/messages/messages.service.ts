import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { plainToInstance } from 'class-transformer';
import { MessageResponseDTO } from './dto/message-response.dto';
import {
  msgStatus,
  msgType,
  message_type,
} from '../../common/enums/message.enums';

/**
 * Incapsula la logica di gestione delle richieste di servizio e feedback.
 * Tutte le risposte vengono trasformate in DTO per isolare l'entity.
 */
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly repo: Repository<Message>,
  ) {}

  async create(
    CreateMessageDto: CreateMessageDto,
    userId: number,
  ): Promise<Message> {
    const message = this.repo.create({
      message_type: CreateMessageDto.message_type,
      description: CreateMessageDto.description,
      type: CreateMessageDto.type,
      status: CreateMessageDto.status,
      sender: { id: userId },
      receiver: CreateMessageDto.id_receiver
        ? { id: CreateMessageDto.id_receiver }
        : undefined,
      requestOffice: { id: CreateMessageDto.id_request_office },
    });

    await this.repo.save(message);

    // Reload with relations
    const messageWithRelations = await this.repo.findOne({
      where: { id: message.id },
      relations: ['sender', 'receiver', 'requestOffice'],
    });

    if (!messageWithRelations) {
      throw new NotFoundException('message not found after creation');
    }

    return messageWithRelations;
  }

  /*findAll(): Promise<Message[]> {
    return this.repo.find();
  }*/

  async findAll(): Promise<MessageResponseDTO[]> {
    const messages = await this.repo.find({
      relations: ['sender', 'receiver', 'requestOffice'],
    });

    return plainToInstance(MessageResponseDTO, messages, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(
    id: number,
    message_type?: message_type,
  ): Promise<MessageResponseDTO> {
    const message = await this.repo.findOne({
      where: { id, message_type },
      relations: ['sender', 'receiver', 'requestOffice'],
    });
    if (!message) throw new NotFoundException('message not found');
    return plainToInstance(MessageResponseDTO, message, {
      excludeExtraneousValues: true,
    });
  }

  async findMsgType(message_type: message_type): Promise<MessageResponseDTO[]> {
    const message = await this.repo.find({
      where: { message_type },
      relations: ['sender', 'receiver', 'requestOffice'],
    });
    if (!message || message.length == 0) {
      throw new NotFoundException(`message ${message_type} not found`);
    }
    return plainToInstance(MessageResponseDTO, message, {
      excludeExtraneousValues: true,
    });
  }

  async findByType(type: msgType): Promise<MessageResponseDTO[]> {
    const messages = await this.repo.find({
      where: { type },
      relations: ['sender', 'receiver', 'requestOffice'],
    });
    if (!messages || messages.length === 0) {
      throw new NotFoundException(`message ${type} not found`);
    }
    return plainToInstance(MessageResponseDTO, messages, {
      excludeExtraneousValues: true,
    });
  }

  async findByStatus(status: msgStatus): Promise<MessageResponseDTO[]> {
    const messages = await this.repo.find({
      where: { status },
      relations: ['sender', 'receiver', 'requestOffice'],
    });
    if (!messages || messages.length === 0) {
      throw new NotFoundException(`message ${status} not found`);
    }
    return plainToInstance(MessageResponseDTO, messages, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    UpdateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.repo.findOneBy({ id });
    if (!message) throw new NotFoundException('message not found');
    return this.repo.save({ id, ...UpdateMessageDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const message = await this.repo.findOneBy({ id });
    if (!message) throw new NotFoundException('message not found');
    return this.repo.delete(id);
  }

  async findByUser(userId: number): Promise<Message[]> {
    const messages = await this.repo.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver', 'requestOffice'],
    });
    return messages;
  }
}

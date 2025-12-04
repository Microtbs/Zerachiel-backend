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
import { PaginationDto } from '@@/pagination/dto/pagination.dto';
import { PaginatedResponse } from '@@/pagination/interfaces/paginated-response.interface';

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

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<MessageResponseDTO>> {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [messages, total] = await this.repo.findAndCount({
      relations: ['sender', 'receiver', 'requestOffice'],
      skip,
      take: limit,
    });

    const data = plainToInstance(MessageResponseDTO, messages, {
      excludeExtraneousValues: true,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
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

  async findMsgType(
    message_type: message_type,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<MessageResponseDTO>> {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [messages, total] = await this.repo.findAndCount({
      where: { message_type },
      relations: ['sender', 'receiver', 'requestOffice'],
      skip,
      take: limit,
    });

    if (messages.length === 0) {
      throw new NotFoundException(`message ${message_type} not found`);
    }

    const data = plainToInstance(MessageResponseDTO, messages, {
      excludeExtraneousValues: true,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByType(
    type: msgType,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<MessageResponseDTO>> {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [messages, total] = await this.repo.findAndCount({
      where: { type },
      relations: ['sender', 'receiver', 'requestOffice'],
      skip,
      take: limit,
    });

    if (messages.length === 0) {
      throw new NotFoundException(`message ${type} not found`);
    }

    const data = plainToInstance(MessageResponseDTO, messages, {
      excludeExtraneousValues: true,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByStatus(
    status: msgStatus,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<MessageResponseDTO>> {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [messages, total] = await this.repo.findAndCount({
      where: { status },
      relations: ['sender', 'receiver', 'requestOffice'],
      skip,
      take: limit,
    });

    if (messages.length === 0) {
      throw new NotFoundException(`message ${status} not found`);
    }

    const data = plainToInstance(MessageResponseDTO, messages, {
      excludeExtraneousValues: true,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
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

  async findByUser(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<MessageResponseDTO>> {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [messages, total] = await this.repo.findAndCount({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver', 'requestOffice'],
      skip,
      take: limit,
    });

    const data = plainToInstance(MessageResponseDTO, messages, {
      excludeExtraneousValues: true,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

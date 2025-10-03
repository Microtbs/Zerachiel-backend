import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Message, msgStatus, msgType, message_type } from "./entities/message.entity"
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { plainToInstance } from 'class-transformer';
import { MessageResponseDto } from './dto/message-response.dto';


@Injectable()
export class MessagesService {

  constructor(@InjectRepository(Message) private readonly repo: Repository<Message>) { }

  create(CreateMessageDto: CreateMessageDto): Promise<Message> {
    const Grave = this.repo.create(CreateMessageDto);
    return this.repo.save(Grave);
  }

  /*findAll(): Promise<Message[]> {
    return this.repo.find();
  }*/

  async findAll(): Promise<MessageResponseDto[]> {
    const messages = await this.repo.find({
      relations: ['sender', 'receiver', 'requestOffice'],
    });

    return plainToInstance(MessageResponseDto, messages, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.repo.findOneBy({ id });
    if (!message) throw new NotFoundException('message not found');
    return message;
  }

  async findMsgType(message_type: message_type): Promise<Message[]> {
    const message = await this.repo.find({ where: { message_type } });
    if (!message || message.length == 0) { throw new NotFoundException(`message ${message_type} not found`) };
    return message;
  }

  async findByType(type: msgType): Promise<Message[]> {
    const message = await this.repo.find({ where: { type } });
    if (!message || message.length == 0) { throw new NotFoundException(`message ${type} not found`) };
    return message;
  }

  async findByStatus(status: msgStatus): Promise<Message[]> {
    const message = await this.repo.find({ where: { status } });
    if (!message || message.length == 0) { throw new NotFoundException(`message ${status} not found`) };
    return message;
  }

  async update(id: number, UpdateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.repo.findOneBy({ id });
    if (!message) throw new NotFoundException('message not found');
    return this.repo.save({ id, ...UpdateMessageDto });
  }

  async remove(id: number): Promise<DeleteResult> {
    const message = await this.repo.findOneBy({ id });
    if (!message) throw new NotFoundException('message not found');
    return this.repo.delete(id);
  }
}

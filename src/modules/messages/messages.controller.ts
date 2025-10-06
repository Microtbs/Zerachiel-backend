import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
  msgStatus,
  msgType,
  message_type,
} from '../../common/enums/message.enums';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Get('message_type/:message_type')
  findMsgType(@Param('message_type') message_type: message_type) {
    return this.messagesService.findMsgType(message_type);
  }
  @Get('type/:msgType')
  findByType(@Param('msgType') type: msgType) {
    return this.messagesService.findByType(type);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: msgStatus) {
    return this.messagesService.findByStatus(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}

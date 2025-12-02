import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
  msgStatus,
  msgType,
  message_type,
} from '../../common/enums/message.enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleType } from 'src/common/enums/role.enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtRequest } from '../../modules/auth/interfaces/jwt-request.interface';

/**
 * REST controller per creare, cercare e aggiornare i messaggi/mandati.
 */
@Controller('messages')
@UseInterceptors(ClassSerializerInterceptor)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Req() req: JwtRequest) {
    return this.messagesService.create(createMessageDto, req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  findByCurrentUser(@Req() req: JwtRequest) {
    return this.messagesService.findByUser(req.user.id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Get()
  findAll() {
    return this.messagesService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Get('message_type/:message_type')
  findMsgType(@Param('message_type') message_type: message_type) {
    return this.messagesService.findMsgType(message_type);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Get('type/:msgType')
  findByType(@Param('msgType') type: msgType) {
    return this.messagesService.findByType(type);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.CARETAKER)
  @Get('status/:status')
  findByStatus(@Param('status') status: msgStatus) {
    return this.messagesService.findByStatus(status);
  }
  //admin*
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }
  //admin*
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}

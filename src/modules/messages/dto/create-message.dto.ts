import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { msgStatus, msgType, message_type } from '@/common/enums/message.enums';

/**
 * DTO per l'apertura di una richiesta di servizio o per inviare un feedback.
 */
export class CreateMessageDto {
  @IsNotEmpty()
  message_type: message_type;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: msgType;

  status: msgStatus;

  @IsNotEmpty()
  @IsInt()
  id_sender: number;

  @IsInt()
  @IsOptional()
  id_receiver: number;

  @IsInt()
  @IsNotEmpty()
  id_request_office: number;
}

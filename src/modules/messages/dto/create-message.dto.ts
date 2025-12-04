import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum, MinLength } from 'class-validator';
import { msgStatus, msgType, message_type } from '@/common/enums/message.enums';

/**
 * DTO per l'apertura di una richiesta di servizio o per inviare un feedback.
 */
export class CreateMessageDto {
  @IsEnum(message_type)
  @IsNotEmpty()
  message_type: message_type;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  description: string;

  @IsEnum(msgType)
  @IsNotEmpty()
  type: msgType;

  @IsEnum(msgStatus)
  @IsNotEmpty()
  status: msgStatus;

  @IsInt()
  @IsOptional()
  id_receiver: number;

  @IsInt()
  @IsNotEmpty()
  id_request_office: number;
}

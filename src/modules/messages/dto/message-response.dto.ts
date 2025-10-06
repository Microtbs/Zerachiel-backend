import { Expose, Type } from 'class-transformer';
import { AccountForMessageDto } from '../../accounts/dto/account-response.dto';

export class MessageResponseDto {
  @Expose()
  id: number;

  @Expose()
  message_type: string;

  @Expose()
  description: string;

  @Expose()
  created_at: number;

  @Expose()
  type: string;

  @Expose()
  status: string;

  @Expose()
  @Type(() => AccountForMessageDto)
  sender: AccountForMessageDto;

  @Expose()
  @Type(() => AccountForMessageDto)
  receiver?: AccountForMessageDto;
}


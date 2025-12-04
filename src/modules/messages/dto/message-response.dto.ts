import { Expose, Type } from 'class-transformer';
import { AccountForMessageDto } from '@@/accounts/dto/account-response.dto';
import { RequestOfficeResponseDto } from '@@/request_offices/dto/request-office-response.dto';

export class MessageResponseDto {
  @Expose()
  id: number;

  @Expose()
  message_type: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => Date)
  created_at: Date;

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

  @Expose()
  @Type(() => RequestOfficeResponseDto)
  requestOffice: RequestOfficeResponseDto;
}

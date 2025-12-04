import { Expose, Type } from 'class-transformer';
import { AccountForMessageDTO } from '@@/accounts/dto/account-response.dto';
import { RequestOfficeResponseDTO } from '@@/request_offices/dto/request-office-response.dto';

export class MessageResponseDTO {
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
  @Type(() => AccountForMessageDTO)
  sender: AccountForMessageDTO;

  @Expose()
  @Type(() => AccountForMessageDTO)
  receiver?: AccountForMessageDTO;

  @Expose()
  @Type(() => RequestOfficeResponseDTO)
  requestOffice: RequestOfficeResponseDTO;
}

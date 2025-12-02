import { Expose, Type } from 'class-transformer';
import { AccountForMessageDTO } from '../../accounts/dto/account-response.dto';
/**
 * DTO serializzato via class-transformer per restituire messaggi arricchiti.
 */
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
  requestOffice: any;
}

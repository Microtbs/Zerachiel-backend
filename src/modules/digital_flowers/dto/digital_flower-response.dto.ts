import { SenderDto } from 'src/modules/accounts/dto/account-response.dto';
import { GraveDto } from 'src/modules/graves/dto/grave-response.dto';

/**
 * Trasformazione utilizzata per presentare i fiori digitali nei controller.
 */
export class DigitalFlowerResponseDto {
  id: number;
  type: string;
  created_at: Date;
  sender: SenderDto;
  grave: GraveDto;
}

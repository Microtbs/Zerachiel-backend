import { SenderDTO } from 'src/modules/accounts/dto/account-response.dto';
import { GraveDTO } from 'src/modules/graves/dto/grave-response.dto';

/**
 * Trasformazione utilizzata per presentare i fiori digitali nei controller.
 */
export class DigitalFlowerResponseDTO {
  id: number;
  type: string;
  created_at: Date;
  sender: SenderDTO;
  grave: GraveDTO;
}

import { RoleDTO } from '../../roles/dto/role-response.dto';

/**
 * DTO minimizzato per incorporare i dati dell'account all'interno dei messaggi.
 */
export class AccountForMessageDto {
  id: number;

  first_name: string;

  last_name: string;

  family_member: boolean;

  created_at: Date;
}

export class SenderDTO {
  id: number;

  first_name: string;

  last_name: string;
}

/**
 * DTO restituito ai client quando richiedono le informazioni
 * di profilo completo con ruoli associati.
 */
export class AccountResponseDTO {
  id: number;

  first_name: string;

  last_name: string;

  email: string;

  roles?: RoleDTO[];
}

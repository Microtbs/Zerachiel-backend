import { RoleDTO } from '../../roles/dto/role-response.dto';

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

export class AccountResponseDTO {
  id: number;

  first_name: string;

  last_name: string;

  email: string;

  roles?: RoleDTO[];
}

import { RoleDTO } from '@@/roles/dto/role-response.dto';

export class AccountForMessageDTO {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
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

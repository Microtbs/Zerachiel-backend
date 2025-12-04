import { Expose } from 'class-transformer';
import { RoleDTO } from '@@/roles/dto/role-response.dto';

export class AccountForMessageDTO {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
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

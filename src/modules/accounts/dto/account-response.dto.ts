import { Expose } from 'class-transformer';
import { RoleDto } from '@@/roles/dto/role-response.dto';

export class AccountForMessageDto {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;
}

export class SenderDto {
  id: number;
  first_name: string;
  last_name: string;
}

export class AccountResponseDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  roles?: RoleDto[];
}

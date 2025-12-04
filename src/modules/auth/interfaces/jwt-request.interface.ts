import { RoleType } from '@/common/enums/role.enums';

export interface JwtRequest extends Request {
  user: {
    id: number;
    roles: RoleType;
  };
  params: {
    id: string;
  };
}

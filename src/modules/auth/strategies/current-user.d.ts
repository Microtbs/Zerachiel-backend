import { RoleType } from '../../../common/enums/role.enums';

export type CurrentUser = {
  id: number;
  roles: RoleType;
};

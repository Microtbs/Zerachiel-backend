import { RoleType } from 'src/common/enums/role.enums';

export type CurrentUser = {
  id: number;
  roles: RoleType[];
};

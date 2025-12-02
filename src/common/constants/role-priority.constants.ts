import { RoleType } from '../enums/role.enums';

export const ROLE_PRIORITY: Record<RoleType, number> = {
  [RoleType.USER]: 1,
  [RoleType.CARETAKER]: 2,
  [RoleType.STONEMASON]: 3,
  [RoleType.OFFICER]: 4,
  [RoleType.ADMIN]: 5,
};

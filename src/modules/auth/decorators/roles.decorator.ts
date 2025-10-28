import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/common/enums/role.enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [RoleType, ...RoleType[]]) =>
  SetMetadata(ROLES_KEY, roles);

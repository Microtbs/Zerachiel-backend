import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/common/enums/role.enums';

export const ROLES_KEY = 'roles';

/**
 * Decoratore custom per indicare i ruoli autorizzati su un handler.
 * Accetta uno o più RoleType e viene interpretato dal RolesGuard.
 */
export const Roles = (...roles: [RoleType, ...RoleType[]]) =>
  SetMetadata(ROLES_KEY, roles);

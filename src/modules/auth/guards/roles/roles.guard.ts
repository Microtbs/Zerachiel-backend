import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from 'src/common/enums/role.enums';
import { ROLES_KEY } from '../../decorators/roles.decorator';

/**
 * Guard che applica una gerarchia di privilegi ai ruoli.
 * Consente di proteggere endpoint indicando il livello minimo richiesto.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) return false;

    const userRole = user.roles as RoleType;

    // Aggiunto per impostare la gerarchia dei ruoli
    const rolePriority: Record<RoleType, number> = {
      [RoleType.USER]: 1,
      [RoleType.CARETAKER]: 2,
      [RoleType.STONEMASON]: 3,
      [RoleType.OFFICER]: 4,
      [RoleType.ADMIN]: 5,
    };

    const userLevel = rolePriority[userRole];

    const requiredLevel = Math.min(
      ...requiredRoles.map((role) => rolePriority[role]),
    );

    return userLevel >= requiredLevel;
  }
}

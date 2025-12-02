import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '../../../common/enums/role.enums';
import { ROLE_PRIORITY } from '../../../common/constants/role-priority.constants';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtRequest } from '../interfaces/jwt-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.getRequiredRoles(context);
    if (requiredRoles.length === 0) return true;

    const user = this.getUserFromRequest(context);
    if (!user || !user.roles) return false;

    return this.hasRequiredRoleLevel(user.roles, requiredRoles);
  }

  private getRequiredRoles(context: ExecutionContext): RoleType[] {
    return (
      this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || []
    );
  }

  private getUserFromRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<JwtRequest>();
    return request.user;
  }

  private hasRequiredRoleLevel(
    userRole: RoleType,
    requiredRoles: RoleType[],
  ): boolean {
    const userLevel = ROLE_PRIORITY[userRole];
    const requiredLevel = Math.min(
      ...requiredRoles.map((role) => ROLE_PRIORITY[role]),
    );
    return userLevel >= requiredLevel;
  }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleType } from '../../../common/enums/role.enums';
import { JwtRequest } from '../interfaces/jwt-request.interface';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<JwtRequest>();
    const userId = request.user?.id;
    const targetId = Number(request.params.id);

    const isOwner = userId === targetId;
    const isAdmin = request.user?.roles === RoleType.ADMIN;

    return isOwner || isAdmin;
  }
}

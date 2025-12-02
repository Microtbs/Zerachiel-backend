import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Wrapper di comodo del guard Passport "jwt" così da poterlo riutilizzare
 * in tutti i controller senza ripetere stringhe magic.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

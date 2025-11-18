import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../../configs/jwtconfig';
import { AuthService } from '../auth.service';

/**
 * Strategy Passport che valida il token JWT inviato via header Authorization.
 * Il payload viene ridotto alle proprietà utili e iniettato nella Request Nest.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: { sub: number; roles: string }) {
    return { id: payload.sub, roles: payload.roles };
  }
}

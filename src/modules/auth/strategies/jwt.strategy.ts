import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../../configs/jwtconfig';
import { AuthService } from '../services/auth.service';
import { RoleType } from '../../../common/enums/role.enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
    });
  }

  validate(payload: { sub: number; roles: RoleType }) {
    return { id: payload.sub, roles: payload.roles };
  }
}

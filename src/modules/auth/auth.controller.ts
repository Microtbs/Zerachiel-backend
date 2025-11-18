import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto as RegisterDto } from '../accounts/dto/create-account.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

/**
 * Controller degli endpoint pubblici di autenticazione.
 * Incapsula la logica di restituzione dei messaggi e la gestione del cookie JWT.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    // NOTE: no user data is returned, only a success message
    await this.authService.register(dto);
    return { message: 'Registration successful.' };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // restituiamo il token sia via header che via cookie HttpOnly per il frontend
    const { access_token } = await this.authService.login(dto);
    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.cookie('Token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return { message: 'Login successful.' };
  }

  @Get('verify')
  verify(@Query('token') token: number) {
    return this.authService.verifyEmail(token);
  }

  @Post('recoverPassword')
  recoverPassword(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Post('resetPassword')
  resetPassword(
    @Body('token') token: number,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}

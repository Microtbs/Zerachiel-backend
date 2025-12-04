import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateAccountDto as RegisterDto } from '../accounts/dto/create-account.dto';
import { LoginDto } from './dto/login.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';
import { JWT_COOKIE_MAX_AGE_MS } from '@/common/constants/auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto);
    return { message: 'Registration successful.' };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(dto);
    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.cookie('Token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: JWT_COOKIE_MAX_AGE_MS,
      domain: process.env.COOKIE_DOMAIN,
    });
    return { message: 'Login successful.' };
  }

  @Get('verify')
  verify(@Query('token') token: number) {
    return this.authService.verifyEmail(token);
  }

  @Post('recoverPassword')
  recoverPassword(@Body() dto: RecoverPasswordDto) {
    return this.authService.requestPasswordReset(dto.email);
  }

  @Post('resetPassword')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto as RegisterDto } from '../accounts/dto/create-account.dto';
import { LoginDto } from './dto/login.dto';

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
  async login(@Body() dto: LoginDto) {
    await this.authService.login(dto);
    return { message: 'Login successful.' };
  }
}

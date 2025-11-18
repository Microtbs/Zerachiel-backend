import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO per autenticare un utente via email/password.
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

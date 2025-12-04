import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsStrongPassword } from '@/common/decorators/strong-password';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Inserisci il token' })
  @IsNumber({}, { message: 'Il token deve essere un numero' })
  token: number;

  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;
}

import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsStrongPassword } from '@/common/decorators/strong-password';

export class ResetPasswordDTO {
  @IsNotEmpty({ message: 'Inserisci il token' })
  @IsNumber({}, { message: 'Il token deve essere un numero' })
  token: number;

  @IsStrongPassword()
  newPassword: string;
}

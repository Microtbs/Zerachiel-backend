import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RecoverPasswordDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Length(1, 255)
  email: string;
}

import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsBoolean,
  IsOptional,
  Length,
  MinLength,
} from 'class-validator';
import { IsStrongPassword } from '@/common/decorators/strong-password';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Length(2, 30)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Length(2, 30)
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @IsOptional()
  @Length(16, 16)
  tax_code?: string;

  @IsStrongPassword()
  @IsNotEmpty()
  hashed_password: string;

  @IsOptional()
  @IsBoolean()
  family_member?: boolean;

  @IsOptional()
  created_at?: Date;
}

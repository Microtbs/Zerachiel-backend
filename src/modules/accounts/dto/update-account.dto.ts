import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { IsStrongPassword } from '@/common/decorators/strong-password';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @Length(2, 30)
  first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @Length(2, 30)
  last_name?: string;

  @IsOptional()
  @IsString()
  @Length(16, 16)
  tax_code?: string;

  @IsOptional()
  @IsBoolean()
  family_member?: boolean;

  @IsOptional()
  @IsDate()
  date_of_birth?: Date;
}

export class UpdateSensitiveDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  currentPassword?: string;

  @IsOptional()
  @IsStrongPassword()
  newPassword?: string;

  @IsOptional()
  @IsEmail()
  newEmail?: string;
}

import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
  Matches,
} from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @Length(1, 30)
  first_name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
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
  currentPassword?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  newPassword?: string;

  @IsOptional()
  @IsEmail()
  newEmail?: string;
}

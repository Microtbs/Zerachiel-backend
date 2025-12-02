import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsBoolean,
  IsOptional,
  Length,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  first_name: string;

  @Length(1, 30)
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @IsOptional()
  @Length(16, 16)
  tax_code?: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  hashed_password: string;

  @IsOptional()
  @IsBoolean()
  family_member?: boolean;

  @IsOptional()
  created_at?: Date;
}

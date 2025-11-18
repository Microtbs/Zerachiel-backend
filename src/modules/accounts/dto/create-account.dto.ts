import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsBoolean,
  IsOptional,
  Length,
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

  @IsNotEmpty()
  @IsString()
  hashed_password: string;

  @IsOptional()
  @IsBoolean()
  family_member?: boolean;

  @IsOptional()
  created_at?: Date;
}

import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
  MinLength,
} from 'class-validator';

/**
 * DTO per registrare un nuovo defunto e legarlo opzionalmente a una tomba.
 */
export class CreateDeceasedDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsDateString()
  @IsNotEmpty()
  dod: string;

  @IsOptional()
  @IsInt()
  id_grave?: number;
}

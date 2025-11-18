import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
} from 'class-validator';

/**
 * DTO per registrare un nuovo defunto e legarlo opzionalmente a una tomba.
 */
export class CreateDeceasedDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  dob: string;

  @IsDateString()
  dod: string;

  @IsOptional()
  @IsInt()
  id_grave?: number;
}

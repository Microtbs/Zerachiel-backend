import { IsString, IsOptional, IsDateString, IsInt, MinLength } from 'class-validator';

/**
 * DTO per aggiornare i dati del defunto, compreso lo spostamento su una tomba differente.
 */
export class UpdateDeceasedDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  last_name?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsDateString()
  dod?: string;

  @IsOptional()
  @IsInt()
  grave_id?: number;
}

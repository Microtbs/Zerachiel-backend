import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';

/**
 * DTO per aggiornare i dati del defunto, compreso lo spostamento su una tomba differente.
 */
export class UpdateDeceasedDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  dob: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  dod: Date;

  @IsOptional()
  @IsNumber()
  grave_id: number;
}

import { IsBoolean, IsNumber, IsString, IsNotEmpty, IsInt, MinLength } from 'class-validator';

/**
 * Definisce i campi richiesti per censire una nuova tomba.
 */
export class CreateGravesDto {
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  stonemason: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  section: string;

  @IsInt()
  @IsNotEmpty()
  request_office_id: number;
}

import { IsBoolean, IsNumber, IsString } from 'class-validator';

/**
 * Definisce i campi richiesti per censire una nuova tomba.
 */
export class CreateGravesDto {
  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  @IsBoolean()
  status: boolean;

  @IsString()
  stonemason: string;

  @IsString()
  section: string;

  @IsNumber()
  request_office_id: number;
}

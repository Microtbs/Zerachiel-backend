import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

/**
 * DTO per aggiungere i riferimenti istituzionali di un comune.
 */
export class CreateMunicipalityContactDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsNotEmpty()
  @IsEmail()
  pec: string;

  @IsNotEmpty()
  municipality_id: number;
}

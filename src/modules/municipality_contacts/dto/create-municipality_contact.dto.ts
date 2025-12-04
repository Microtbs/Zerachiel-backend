import { IsNotEmpty, IsString, IsEmail, IsInt, MinLength } from 'class-validator';

/**
 * DTO per aggiungere i riferimenti istituzionali di un comune.
 */
export class CreateMunicipalityContactDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  telephone: string;

  @IsNotEmpty()
  @IsEmail()
  pec: string;

  @IsInt()
  @IsNotEmpty()
  municipality_id: number;
}

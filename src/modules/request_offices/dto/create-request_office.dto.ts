import { IsString, IsNotEmpty, MaxLength, IsInt, MinLength } from 'class-validator';

/**
 * DTO utilizzato per agganciare un ufficio a un determinato comune.
 */
export class CreateRequestOfficeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  address: string;

  @IsInt()
  @IsNotEmpty()
  id_municipality: number;
}

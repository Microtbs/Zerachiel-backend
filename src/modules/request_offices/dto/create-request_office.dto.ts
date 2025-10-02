import { IsString, IsNotEmpty, MaxLength, IsInt } from 'class-validator';

export class CreateRequestOfficeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @IsInt()
  @IsNotEmpty()
  id_municipality: number;
}

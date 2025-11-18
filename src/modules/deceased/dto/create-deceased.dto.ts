import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsInt,
} from 'class-validator';

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

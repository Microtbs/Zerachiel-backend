import { IsBoolean, IsNumber, IsString } from 'class-validator';

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
  caretaker_id: number;

  @IsNumber()
  request_office_id: number;
}


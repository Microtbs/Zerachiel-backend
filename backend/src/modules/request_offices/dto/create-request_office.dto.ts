import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateRequestOfficeDto {
  @IsBoolean()
  @IsNotEmpty()
  requests_processed: boolean;

  @IsInt()
  @IsNotEmpty()
  grave_id: number;

  @IsInt()
  @IsNotEmpty()
  municipality_id: number;
}

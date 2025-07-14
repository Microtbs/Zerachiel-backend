import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsBoolean()
  submitted: boolean;

  @IsBoolean()
  accepted: boolean;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  request_office_id: number;
}

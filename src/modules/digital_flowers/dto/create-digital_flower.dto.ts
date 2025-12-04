import { IsNotEmpty, IsInt, IsDateString, IsEnum } from 'class-validator';
import { FlowerType } from '../../../common/enums/flower.enums';

export class CreateDigitalFlowersDto {
  @IsEnum(FlowerType)
  @IsNotEmpty()
  type: FlowerType;

  @IsDateString()
  @IsNotEmpty()
  duration: string;

  @IsInt()
  @IsNotEmpty()
  account_id: number;

  @IsInt()
  @IsNotEmpty()
  grave_id: number;
}

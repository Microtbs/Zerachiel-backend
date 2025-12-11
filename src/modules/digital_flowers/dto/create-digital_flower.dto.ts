import { IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { FlowerType } from '../../../common/enums/flower.enums';

export class CreateDigitalFlowersDto {
  @IsEnum(FlowerType)
  @IsNotEmpty()
  type: FlowerType;

  @IsInt()
  @IsNotEmpty()
  account_id: number;

  @IsInt()
  @IsNotEmpty()
  grave_id: number;
}

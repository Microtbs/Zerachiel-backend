import { IsNotEmpty, IsInt, IsDate } from 'class-validator';
import { FlowerType } from '../../../common/enums/flower.enums';

export class CreateDigitalFlowersDto {
  @IsNotEmpty()
  type: FlowerType;

  @IsDate()
  duration: Date;

  @IsInt()
  account_id: number;

  @IsInt()
  grave_id: number;
}

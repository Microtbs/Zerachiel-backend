import { PartialType } from '@nestjs/mapped-types';
import { CreateDigitalFlowersDto } from './create-digital_flower.dto';

export class UpdateDigitalFlowersDto extends PartialType(CreateDigitalFlowersDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateDigitalFlowersDto } from './create_digital_flowers.dto';

export class UpdateDigitalFlowersDto extends PartialType(CreateDigitalFlowersDto) {}

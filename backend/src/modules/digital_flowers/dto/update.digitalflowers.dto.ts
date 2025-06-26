import { PartialType } from '@nestjs/mapped-types';
import { CreateDigitalFlowersDto } from './create.digitalflowers.dto';

export class UpdateDigitalFlowersDto extends PartialType(CreateDigitalFlowersDto) {}

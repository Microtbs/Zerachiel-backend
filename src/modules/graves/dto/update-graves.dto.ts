import { PartialType } from '@nestjs/mapped-types';
import { CreateGravesDto } from './create-graves.dto';

export class UpdateGravesDto extends PartialType(CreateGravesDto) {}

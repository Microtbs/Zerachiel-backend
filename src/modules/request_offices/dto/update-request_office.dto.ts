import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestOfficeDto } from './create-request_office.dto';

export class UpdateRequestOfficeDto extends PartialType(
  CreateRequestOfficeDto,
) {}

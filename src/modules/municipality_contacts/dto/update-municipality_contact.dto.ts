import { PartialType } from '@nestjs/mapped-types';
import { CreateMunicipalityContactDto } from './create-municipality_contact.dto';

export class UpdateMunicipalityContactDto extends PartialType(CreateMunicipalityContactDto) {}

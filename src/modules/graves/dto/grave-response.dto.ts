import { DeceasedDto } from 'src/modules/deceased/dto/deceased-response.dto';

/**
 * DTO per esporre una tomba insieme ai defunti associati.
 */
export class GraveDto {
  id: number;
  deceased: DeceasedDto[];
}

import { Expose } from 'class-transformer';

export class RequestOfficeResponseDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  address: string;
}

import { Expose } from 'class-transformer';

export class RequestOfficeResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  address: string;
}

import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateRequestOfficeDto {
  @IsBoolean()
  @IsNotEmpty()
  requests_processed: boolean;

  @IsInt()
  @IsNotEmpty()
  grave_id: number;
  // -- FIX : Questa relazione dovrebbe essere "opzionale" OneToMany, ma nel database viene specificata una relazione ManyToOne -> Includere request_offices_id nella tabella 'graves' per evitare errori di relazione

  @IsInt()
  @IsNotEmpty()
  municipality_id: number;
}

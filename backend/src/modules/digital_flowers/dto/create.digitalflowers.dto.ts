import { IsString, IsNotEmpty, Length, IsInt,Min } from 'class-validator';

export class CreateDigitalFlowersDto {
  @IsString() // deve essere una stringa
  @IsNotEmpty() // non può essere vuota
  @Length(2, 30) // deve avere minimo 2 caratteri, massimo 30
  type: string;

  @IsInt() // deve essere un numero intero
  @Min(1) // almeno 1 ( non si possono inviare 0 fiori)
  duration: number;

  @IsInt() // ID deve essere un numero intero
  @Min(1) // l'ID dell'utente deve esistere (>0)
  user_id: number;

  @IsInt() // tomba deve essere un numero intero
  @Min(1) // l'ID della tomba deve esistere (>0)
  grave_id: number;
}
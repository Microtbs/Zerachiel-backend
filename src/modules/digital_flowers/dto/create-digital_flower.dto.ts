import { IsNotEmpty, IsInt } from 'class-validator';
import { FlowerType } from '../../../common/enums/flower.enums';

/**
 * DTO per l'invio di un fiore digitale a una tomba specifica.
 */
export class CreateDigitalFlowersDto {
  @IsNotEmpty() // non può essere vuota
  //@Length(2, 30) // deve avere minimo 2 caratteri, massimo 30
  type: FlowerType;

  @IsInt() // deve essere un numero intero
  //@Min(1) // almeno 1 ( non si possono inviare 0 fiori)
  duration: number;

  @IsInt() // ID deve essere un numero intero
  //@Min(1) // l'ID dell'utente deve esistere (>0)
  account_id: number;

  @IsInt() // tomba deve essere un numero intero
  // @Min(1) // l'ID della tomba deve esistere (>0)
  grave_id: number;
}

import { IsNotEmpty, IsString, Length,} from 'class-validator';

export class CreateMunicipalityDto {
  @IsString() // verifichiamo che il dato sia una stringa
  @IsNotEmpty() // verifichiamo che la stringa non sia vuota 
  @Length(2, 255) // imponiamo una lunghezza minima e massima della stringa
  name: string;
}

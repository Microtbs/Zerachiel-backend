import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export function IsStrongPassword() {
  return applyDecorators(
    IsNotEmpty({ message: 'La password non può essere vuota' }),
    IsString(),
    MinLength(8, { message: 'La password deve essere di almeno 8 caratteri' }),
    Matches(/[A-Z]/, {
      message: 'La password deve contenere almeno una lettera maiuscola',
    }),
    Matches(/[a-z]/, {
      message: 'La password deve contenere almeno una lettera minuscola',
    }),
    Matches(/\d/, { message: 'La password deve contenere almeno un numero' }),
    Matches(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'La password deve contenere almeno un carattere speciale',
    }),
  );
}

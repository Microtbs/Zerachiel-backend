import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class CreateMunicipalityContactDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    telephone: string;

    @IsNotEmpty()
    @IsEmail()
    pec: string;

    @IsNotEmpty()
    municipality_id: number;
}

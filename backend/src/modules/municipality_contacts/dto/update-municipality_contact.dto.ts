import { IsString, IsEmail , IsOptional} from 'class-validator';
export class UpdateMunicipalityContactDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    telephone: string;

    @IsOptional()
    @IsEmail()
    pec: string;

    @IsOptional()
    municipality_id: number;
}

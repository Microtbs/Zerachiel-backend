import { IsNotEmpty, IsString, IsDate, IsNumber } from "class-validator";
export class CreateDeceasedDto {

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsDate()
    dob: Date;

    @IsNotEmpty()
    @IsDate()
    dod: Date;

    @IsNotEmpty()
    @IsNumber()
    grave_id: number;

}

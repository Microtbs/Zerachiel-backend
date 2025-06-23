import { IsDate, IsNumber, IsString, isDateString } from "class-validator";

export class CreateCaretakerDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    phone: string;

    @IsDate()
    shift_start_time: Date;

    @IsDate()
    shift_end_time: Date;

    @IsNumber()
    municipality_id: number;
}

import { IsNotEmpty, IsEmail, IsString, IsBoolean } from "class-validator";
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    first_name: String;

    @IsNotEmpty()
    @IsString()
    last_name: String;

    @IsNotEmpty()
    @IsEmail()
    email: String;

    @IsNotEmpty()
    @IsString()
    tax_code: String;

    @IsNotEmpty()
    @IsString()
    password: String;

    @IsNotEmpty()
    @IsBoolean()
    family_member: Boolean;

}

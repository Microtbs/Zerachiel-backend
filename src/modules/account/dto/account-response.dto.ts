import { Expose } from 'class-transformer';

export class AccountForMessageDto {
    @Expose()
    id: number;

    @Expose()
    first_name: string;

    @Expose()
    last_name: string;

    @Expose()
    family_member: boolean;

    @Expose()
    created_at: Date;

    // niente email, tax_code, hashed_password
}
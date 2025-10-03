/*import { AccountForMessageDto } from '../../account/dto/account-response.dto';

export class MessageResponseDto {
    id: number;
    message_type: string;
    description: string;
    created_at: number;
    type: string;
    status: string;

    sender: AccountForMessageDto;
    receiver?: AccountForMessageDto;   // può essere nullo
}
*/

import { Expose, Type } from 'class-transformer';
import { AccountForMessageDto } from '../../account/dto/account-response.dto';

export class MessageResponseDto {
    @Expose()
    id: number;

    @Expose()
    message_type: string;

    @Expose()
    description: string;

    @Expose()
    created_at: number;

    @Expose()
    type: string;

    @Expose()
    status: string;

    @Expose()
    @Type(() => AccountForMessageDto) // dice a class-transformer come trasformare sender
    sender: AccountForMessageDto;

    @Expose()
    @Type(() => AccountForMessageDto) // idem per receiver
    receiver?: AccountForMessageDto;
}
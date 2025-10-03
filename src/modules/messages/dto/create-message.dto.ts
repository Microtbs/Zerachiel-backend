import { msgStatus, msgType, message_type } from '../entities/message.entity'
import { IsString, IsInt, IsNotEmpty, isNotEmpty, isInt } from 'class-validator';
export class CreateMessageDto {
    @IsNotEmpty()
    message_type: message_type;

    @IsString()
    @IsNotEmpty()
    description: string
    @IsInt()
    created_at: number;

    @IsNotEmpty()
    type: msgType

    status: msgStatus
    @IsInt()
    id_sender: number

    @IsInt()
    @IsNotEmpty()
    id_receiver: number

    @IsInt()
    @IsNotEmpty()
    id_request_office: number;
}


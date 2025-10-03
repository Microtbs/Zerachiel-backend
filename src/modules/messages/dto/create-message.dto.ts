import { msgStatus, msgType, message_type } from '../entities/message.entity'
import { IsString, IsInt, IsNotEmpty, isNotEmpty, isInt, IsOptional } from 'class-validator';
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

    @IsNotEmpty()
    @IsInt()
    id_sender: number

    @IsInt()
    @IsOptional()
    id_receiver: number

    @IsInt()
    @IsNotEmpty()
    id_request_office: number;
}


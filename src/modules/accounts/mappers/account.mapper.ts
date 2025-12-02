import { Account } from '../entities/account.entity';
import {
  AccountResponseDTO,
  AccountForMessageDTO,
  SenderDTO,
} from '../dto/account-response.dto';

export class AccountMapper {
  static toResponse(account: Account): AccountResponseDTO {
    return {
      id: account.id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      roles: account.userRoles?.map((ur) => ({
        id: ur.role.id,
        type: ur.role.type,
      })),
    };
  }

  static toResponseList(accounts: Account[]): AccountResponseDTO[] {
    return accounts.map((account) => this.toResponse(account));
  }

  static toMessageDto(account: Account): AccountForMessageDTO {
    return {
      id: account.id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
    };
  }

  static toSenderDto(account: Account): SenderDTO {
    return {
      id: account.id,
      first_name: account.first_name,
      last_name: account.last_name,
    };
  }
}

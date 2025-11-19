import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { RoleType } from 'src/common/enums/role.enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { UpdateAccountDto, UpdateSensitiveDto } from './dto/update-account.dto';
import { JwtRequest } from 'src/modules/auth/interfaces/jwt-request.interface';

/**
 * Espone gli endpoint REST relativi agli account utente.
 * Gestisce registrazione, profili e gestione credenziali con i relativi guard.
 */
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(Number(id));
  }

  @Get(':id/roleOfAccount')
  getRoleOfAccount(@Param('id') id: string) {
    return this.accountService.getRoleOfAccount(Number(id));
  }

  /**
   * Entry point dinamico per aggiornare campi specifici
   * (es. editPassword, editEmail) basandosi sul parametro di rotta.
   */
  /* @Patch('edit/:parameter')
  editAccount(
    @Param('parameter') parameter: string,
    @Body() body: { id: number } & Record<string, unknown>,
  ) {
    const methodName = `edit${parameter.charAt(0).toUpperCase()}${parameter.slice(1)}`;

    const method = this.accountService[methodName] as
      | ((
          id: number,
          dto: Record<string, unknown>,
        ) => Promise<{ message: string; account?: unknown }>)
      | undefined;

    if (!method) {
      return { message: `Method ${methodName} not found` };
    }

    return method.call(this.accountService, body.id, body) as Promise<{
      message: string;
      account?: unknown;
    }>;
  }*/
  /**
   * Endpoint per aggiornare la password dell'utente autenticato.
   */
  @Patch('password')
  @UseGuards(JwtAuthGuard)
  editPassword(@Req() req: JwtRequest, @Body() dto: UpdateSensitiveDto) {
    const userId = req.user.id;
    return this.accountService.editPassword(userId, dto);
  }
  /**
   *  Endpoint per aggiornare l'email dell'utente autenticato.
   */
  @Patch('email')
  @UseGuards(JwtAuthGuard)
  editEmail(@Req() req: JwtRequest, @Body() dto: UpdateSensitiveDto) {
    const userId = req.user.id;
    return this.accountService.editEmail(userId, dto);
  }
  /**
   * Endpoint per aggiornare il profilo dell'utente specificato,
   * modificando i campi first_name, last_name, tax_code, family_member e date_of_birth.
   */
  @Patch('profile/:id')
  updateProfile(@Param('id') id: string, @Body() body: UpdateAccountDto) {
    return this.accountService.update(Number(id), body);
  }
  /**
   * Endpoint per rimuovere un account specifico.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(Number(id));
  }
}

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
  BadRequestException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { RoleType } from 'src/common/enums/role.enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { UpdateAccountDto, UpdateSensitiveDto } from './dto/update-account.dto';
import { JwtRequest } from 'src/modules/auth/interfaces/jwt-request.interface';
import { RolesService } from '../roles/roles.service';

/**
 * Espone gli endpoint REST relativi agli account utente.
 * Gestisce registrazione, profili e gestione credenziali con i relativi guard.
 */

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountService: AccountsService,
    private readonly rolesService: RolesService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findOne(@Req() req: JwtRequest) {
    const account = await this.accountService.findOne(req.user.id);

    const roles = await Promise.all(
      account.userRoles.map((ur) => this.rolesService.findOne(ur.role.id)),
    );

    return {
      id: account.id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      tax_code: account.tax_code,
      family_member: account.family_member,
      date_of_birth: account.date_of_birth,
      roles,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Get(':id')
  async findOneGeneral(@Param('id') id: string) {
    const accountId = Number(id);
    if (isNaN(accountId)) {
      throw new BadRequestException('Inserire un id numerico valido');
    }
    return await this.accountService.findOne(accountId);
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

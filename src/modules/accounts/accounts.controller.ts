import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { RoleType } from 'src/common/enums/role.enums';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

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
    return this.accountService.findOne(+id);
  }

  @Get(':id/roleOfAccount')
  getRoleOfAccount(@Param('id') id: string) {
    return this.accountService.getRoleOfAccount(+id);
  }

  @Patch('edit/:parameter')
  editAccount(
    @Param('parameter') parameter: string,
    @Body() body: any & { id: number },
  ) {
    const methodName = `edit${parameter.charAt(0).toUpperCase()}${parameter.slice(1)}`;

    return (
      this.accountService[methodName]?.(body.id, body) ?? {
        message: `Method ${methodName} not found`,
      }
    );
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  editPassword(@Req() req, @Body() dto: UpdateSensitiveDto) {
    const userId = req.user.id;
    return this.accountService.editPassword(userId, dto);
  }

  @Patch('email')
  @UseGuards(JwtAuthGuard)
  editEmail(@Req() req, @Body() dto: UpdateSensitiveDto) {
    const userId = req.user.id;
    return this.accountService.editEmail(userId, dto);
  }

  @Patch('profile/:id')
  updateProfile(@Param('id') id: string, @Body() body: any) {
    return this.accountService.update(+id, body);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}

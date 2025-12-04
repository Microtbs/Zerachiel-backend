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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { RoleType } from '@/common/enums/role.enums';
import { Roles } from '@/common/decorators/role';
import { JwtAuthGuard } from '@@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@@/auth/guards/roles.guard';
import { OwnershipGuard } from '@@/auth/guards/ownership.guard';
import { UpdateAccountDto, UpdateSensitiveDto } from './dto/update-account.dto';
import { JwtRequest } from '@@/auth/interfaces/jwt-request.interface';
import { PaginationDto } from '@@/pagination/dto/pagination.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.accountService.findAll(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findOne(@Req() req: JwtRequest) {
    const account = await this.accountService.findOne(req.user.id);

    return {
      id: account.id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      tax_code: account.tax_code,
      family_member: account.family_member,
      date_of_birth: account.date_of_birth,
      roles: account.userRoles.map((ur) => ur.role),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Get(':id')
  async findOneGeneral(@Param('id', ParseIntPipe) id: number) {
    return await this.accountService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Get(':id/roleOfAccount')
  getRoleOfAccount(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.getRoleOfAccount(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  editPassword(@Req() req: JwtRequest, @Body() dto: UpdateSensitiveDto) {
    const userId = req.user.id;
    return this.accountService.editPassword(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('email')
  editEmail(@Req() req: JwtRequest, @Body() dto: UpdateSensitiveDto) {
    const userId = req.user.id;
    return this.accountService.editEmail(userId, dto);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Patch('profile/:id')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAccountDto,
  ) {
    return this.accountService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.remove(id);
  }
}

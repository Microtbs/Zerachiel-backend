import { Controller, Delete, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';

/**
 * Espone endpoint semplici per consultare ruoli e assegnarli agli account.
 */
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }
  @Get('AssignRole/:account_id/:role_id')
  async assignRole(
    @Param('account_id') accountId: number,
    @Param('role_id') roleId: number,
  ) {
    await this.rolesService.createRoleofAccount(+accountId, +roleId);
    return { message: 'Role assigned successfully' };
  }

  @Delete('AssignRole/:account_id')
  async removeRole(@Param('account_id') accountId: number) {
    await this.rolesService.removeRoleOfAccount(+accountId);
    return { message: 'Role removed successfully' };
  }
}

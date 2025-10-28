import { Controller, Delete, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';

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
  assignRole(
    @Param('account_id') accountId: number,
    @Param('role_id') roleId: number,
  ) {
    const assign = this.rolesService.createRoleofAccount(+accountId, +roleId);
    return { message: 'Role assigned successfully' };
  }
  @Delete('AssignRole/:account_id')
  removeRole(@Param('account_id') accountId: number) {
    const deleteRole = this.rolesService.removeRoleOfAccount(+accountId);
    return { message: 'Role removed successfully' };
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MunicipalityContactsService } from './municipality_contacts.service';
import { CreateMunicipalityContactDto } from './dto/create-municipality_contact.dto';
import { UpdateMunicipalityContactDto } from './dto/update-municipality_contact.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { RoleType } from 'src/common/enums/role.enums';

/**
 * API per creare e consultare i contatti istituzionali legati ai comuni.
 */
@Controller('municipality_contacts')
export class MunicipalityContactsController {
  constructor(
    private readonly municipality_contactServices: MunicipalityContactsService,
  ) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Post()
  create(@Body() createMunicipalityContactDto: CreateMunicipalityContactDto) {
    return this.municipality_contactServices.create(
      createMunicipalityContactDto,
    );
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Get()
  findAll() {
    return this.municipality_contactServices.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.municipality_contactServices.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMunicipalityContactDto: UpdateMunicipalityContactDto,
  ) {
    return this.municipality_contactServices.update(
      +id,
      updateMunicipalityContactDto,
    );
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.municipality_contactServices.remove(+id);
  }
}

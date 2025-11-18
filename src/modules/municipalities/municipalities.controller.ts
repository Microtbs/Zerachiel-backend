import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { RoleType } from 'src/common/enums/role.enums';

@Controller('municipalities')
export class MunicipalitiesController {
  constructor(private readonly service: MunicipalitiesService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Get()
  findAll() {
    return this.service.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Post()
  create(@Body() dto: CreateMunicipalityDto) {
    return this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMunicipalityDto,
  ) {
    return this.service.update(id, dto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

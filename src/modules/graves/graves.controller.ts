import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GravesService } from './graves.service';
import { CreateGravesDto } from './dto/create-graves.dto';
import { UpdateGravesDto } from './dto/update-graves.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleType } from 'src/common/enums/role.enums';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@Controller('graves')
export class GravesController {
  constructor(private readonly gravesService: GravesService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Post()
  create(@Body() creatGravesDto: CreateGravesDto) {
    return this.gravesService.create(creatGravesDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Get()
  findAll() {
    return this.gravesService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.gravesService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateGravesDto: UpdateGravesDto,
  ) {
    return this.gravesService.update(+id, updateGravesDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Delete('id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.gravesService.remove(+id);
  }
}

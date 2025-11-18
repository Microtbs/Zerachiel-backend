import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DigitalFlowersService } from './digital_flowers.service';
import { CreateDigitalFlowersDto } from './dto/create-digital_flower.dto';
import { UpdateDigitalFlowersDto } from './dto/update-digital_flower.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleType } from 'src/common/enums/role.enums';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

@Controller('digital_flowers')
export class DigitalFlowersController {
  constructor(private readonly service: DigitalFlowersService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Post()
  create(@Body() dto: CreateDigitalFlowersDto) {
    return this.service.create(dto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDigitalFlowersDto,
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

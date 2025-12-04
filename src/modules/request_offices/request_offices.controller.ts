import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RequestOfficesService } from './request_offices.service';
import { CreateRequestOfficeDto } from './dto/create-request_office.dto';
import { UpdateRequestOfficeDto } from './dto/update-request_office.dto';
import { RolesGuard } from '@@/auth/guards/roles.guard';
import { JwtAuthGuard } from '@@/auth/guards/jwt-auth.guard';
import { RoleType } from '@/common/enums/role.enums';
import { Roles } from '@/common/decorators/role';
import { PaginationDto } from '@@/pagination/dto/pagination.dto';

@Controller('request_offices')
export class RequestOfficesController {
  constructor(private readonly requestOfficesService: RequestOfficesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Post()
  create(@Body() createRequestOfficeDto: CreateRequestOfficeDto) {
    return this.requestOfficesService.create(createRequestOfficeDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.requestOfficesService.findAll(paginationDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestOfficesService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestOfficeDto: UpdateRequestOfficeDto,
  ) {
    return this.requestOfficesService.update(+id, updateRequestOfficeDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestOfficesService.remove(+id);
  }
}

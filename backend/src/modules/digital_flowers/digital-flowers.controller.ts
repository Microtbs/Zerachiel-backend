import { Controller, Post, Get, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { DigitalFlowersService } from './digital-flowers.service';
import { CreateDigitalFlowersDto } from './dto/create.digitalflowers.dto';
import { UpdateDigitalFlowersDto } from './dto/update.digitalflowers.dto';

@Controller('digitalflowers')
export class DigitalFlowersController {
  constructor(private readonly service: DigitalFlowersService) {}

  @Post()
  create(@Body() dto: CreateDigitalFlowersDto) {
    return this.service.create(dto);
  }

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

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}


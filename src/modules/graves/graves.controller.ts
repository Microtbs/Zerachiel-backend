import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { GravesService } from './graves.service';
import { CreateGravesDto } from './dto/create-graves.dto';
import { UpdateGravesDto } from './dto/update-graves.dto';

@Controller('graves')
export class GravesController {
  constructor(private readonly gravesService: GravesService) {}

  @Post()
  create(@Body() creatGravesDto: CreateGravesDto) {
    return this.gravesService.create(creatGravesDto);
  }

  @Get()
  findAll() {
    return this.gravesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.gravesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateGravesDto: UpdateGravesDto,
  ) {
    return this.gravesService.update(+id, updateGravesDto);
  }

  @Delete('id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.gravesService.remove(+id);
  }
}

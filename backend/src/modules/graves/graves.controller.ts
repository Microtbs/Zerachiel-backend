import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GravesService } from './graves.service';
import { CreateGravesDto } from './dto/create-graves.dto';
import { UpdateGravesDto } from './dto/update-graves.dto';


@Controller('graves')
export class GravesController {
    constructor(private readonly gravesService: GravesService) { }

    @Post()
    create(@Body() dto: CreateGravesDto) {
        return this.gravesService.create(dto);
    }

    @Get()
    findAll() {
        return this.gravesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gravesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateGravesDto) {
        return this.gravesService.update(+id, dto);
    }

    @Delete('id')
    remove(@Param('id') id: string) {
        return this.gravesService.remove(+id);
    }
}

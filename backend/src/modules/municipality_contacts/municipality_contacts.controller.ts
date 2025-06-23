import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MucipalityContactsService } from './mucipality_contacts.service';
import { CreateMunicipalityContactDto } from './dto/create-municipality_contact.dto';
import { UpdateMunicipalityContactDto } from './dto/update-municipality_contact.dto';

@Controller('municipality-contacts')
export class MunicipalityContactsController {
    constructor(private readonly municipality_contactServices: MucipalityContactsService) { }

    @Post()
    create(@Body() createMunicipalityContactDto: CreateMunicipalityContactDto) {
        return this.municipality_contactServices.create(createMunicipalityContactDto);
    }

    @Get()
    findAll() {
        return this.municipality_contactServices.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.municipality_contactServices.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateMunicipalityContactDto: UpdateMunicipalityContactDto) {
        return this.municipality_contactServices.update(+id, updateMunicipalityContactDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.municipality_contactServices.remove(+id);
    }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestOfficesService } from './request_offices.service';
import { CreateRequestOfficeDto } from './dto/create-request_office.dto';
import { UpdateRequestOfficeDto } from './dto/update-request_office.dto';

@Controller('request_offices')
export class RequestOfficesController {
  constructor(private readonly requestOfficesService: RequestOfficesService) {}

  @Post()
  create(@Body() createRequestOfficeDto: CreateRequestOfficeDto) {
    return this.requestOfficesService.create(createRequestOfficeDto);
  }

  @Get()
  findAll() {
    return this.requestOfficesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestOfficesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestOfficeDto: UpdateRequestOfficeDto,
  ) {
    return this.requestOfficesService.update(+id, updateRequestOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestOfficesService.remove(+id);
  }
}

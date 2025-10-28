import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DeceasedService } from './deceased.service';
import { CreateDeceasedDto } from './dto/create-deceased.dto';
import { UpdateDeceasedDto } from './dto/update-deceased.dto';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleType } from 'src/common/enums/role.enums';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('deceased')
export class DeceasedController {
  constructor(private readonly deceasedService: DeceasedService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleType.OFFICER)
  @Post()
  create(@Body() createDeceasedDto: CreateDeceasedDto) {
    return this.deceasedService.create(createDeceasedDto);
  }

  @Get()
  findAll() {
    return this.deceasedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deceasedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeceasedDto: UpdateDeceasedDto,
  ) {
    return this.deceasedService.update(+id, updateDeceasedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deceasedService.remove(+id);
  }
}

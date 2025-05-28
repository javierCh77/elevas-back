import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EventosRRHHService } from './eventos-rrhh.service';
import { CreateEventoRRHHDto } from './dto/create-evento-rrhh.dto';
import { UpdateEventoRRHHDto } from './dto/update-evento-rrhh.dto';

@Controller('eventos-rrhh')
export class EventosRRHHController {
  constructor(private readonly service: EventosRRHHService) {}

  @Get()
  findAll(
    @Query('tipo') tipo?: string,
    @Query('estado') estado?: string,
    @Query('empleadoId') empleadoId?: string,
  ) {
    return this.service.findAll({ tipo, estado, empleadoId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEventoRRHHDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventoRRHHDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

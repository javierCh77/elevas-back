// src/encuesta/encuestas.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { EncuestasService } from './encuestas.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { SubmitRespuestaDto } from './dto/submit-respuesta.dto';

@Controller('encuestas')
export class EncuestasController {
  constructor(private readonly encuestasService: EncuestasService) {}

  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto) {
    return this.encuestasService.create(createEncuestaDto);
  }

  @Get()
  findAll() {
    return this.encuestasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encuestasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEncuestaDto: UpdateEncuestaDto,
  ) {
    return this.encuestasService.update(id, updateEncuestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encuestasService.remove(id);
  }

  @Post('responder')
  submitRespuestas(@Body() submitRespuestaDto: SubmitRespuestaDto) {
    return this.encuestasService.submitRespuestas(submitRespuestaDto);
  }
  
   // ✅ NUEVO ENDPOINT: obtener respuestas por empleado
   @Get('respuestas/empleado/:empleadoId')
   getRespuestasPorEmpleado(@Param('empleadoId') empleadoId: string) {
     return this.encuestasService.getRespuestasPorEmpleado(empleadoId);
   }
  
  
}

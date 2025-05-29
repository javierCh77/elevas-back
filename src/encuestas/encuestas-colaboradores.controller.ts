// src/encuestas-colaboradores/encuestas-colaboradores.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EncuestasColaboradoresService } from './encuestas-colaboradores.service';
import { CreateEncuestaCompletaDto } from './dto/create-encuesta-completa.dto';


@Controller('encuestas-colaboradores')
export class EncuestasColaboradoresController {
  constructor(private readonly service: EncuestasColaboradoresService) {}

  @Post()
  async create(@Body() dto: CreateEncuestaCompletaDto) {
    return this.service.createEncuestaCompleta(dto);
  }
  @Get('resultados')
  async getResultados() {
    return this.service.getResultados();
  }
  
  
}

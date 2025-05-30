// src/respuesta-encuesta/respuesta-encuesta.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { RespuestaEncuestaService } from './respuesta-encuesta.service';
import { CreateRespuestaEncuestaDto } from './dto/create-respuesta-encuesta.dto';

@Controller('respuesta-encuesta')
export class RespuestaEncuestaController {
  constructor(private readonly service: RespuestaEncuestaService) {}

  @Post()
  create(@Body() dto: CreateRespuestaEncuestaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}

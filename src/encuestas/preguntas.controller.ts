// src/encuesta/preguntas.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta } from './entities/pregunta.entity';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { Encuesta } from './entities/encuesta.entity';
import { OpcionRespuesta } from './entities/opcion-respuesta.entity';

@Controller('preguntas')
export class PreguntasController {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,
    @InjectRepository(Encuesta)
    private readonly encuestaRepo: Repository<Encuesta>,
    @InjectRepository(OpcionRespuesta)
    private readonly opcionRepo: Repository<OpcionRespuesta>,
  ) {}

  @Post()
  async create(@Body() dto: CreatePreguntaDto) {
    const encuesta = await this.encuestaRepo.findOneBy({ id: dto.encuestaId });

    if (!encuesta) {
      throw new Error('Encuesta no encontrada');
    }

    const pregunta = this.preguntaRepo.create({
      texto: dto.texto,
      tipo: dto.tipo,
      orden: dto.orden,
      encuesta,
    });

    const savedPregunta = await this.preguntaRepo.save(pregunta);

    // Si tiene opciones (para tipo opción múltiple o única)
    if (dto.opciones?.length) {
      const opciones = dto.opciones.map((texto) =>
        this.opcionRepo.create({ texto, pregunta: savedPregunta }),
      );
      await this.opcionRepo.save(opciones);
    }

    return savedPregunta;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.preguntaRepo.findOne({
      where: { id },
      relations: ['opciones'],
    });
  }
}

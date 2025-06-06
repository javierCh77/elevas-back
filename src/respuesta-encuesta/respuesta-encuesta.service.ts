// src/respuesta-encuesta/respuesta-encuesta.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRespuestaEncuestaDto } from './dto/create-respuesta-encuesta.dto';
import { RespuestaEncuesta } from './entities/respuesta-encuesta.entity';

@Injectable()
export class RespuestaEncuestaService {
  constructor(
    @InjectRepository(RespuestaEncuesta)
    private readonly repo: Repository<RespuestaEncuesta>
  ) {}

  async create(dto: CreateRespuestaEncuestaDto): Promise<RespuestaEncuesta> {
    const existente = await this.repo.findOne({ where: { dni: dto.dni } });
    if (existente) throw new ConflictException('El DNI ya fue registrado.');
  
    const nueva = this.repo.create(dto); // dto ahora incluye el nuevo `respuestas` y `areaTrabajo`
    return this.repo.save(nueva);
  }

  async findAll(): Promise<RespuestaEncuesta[]> {
    return this.repo.find({ order: { fecha: 'DESC' } });
  }
}

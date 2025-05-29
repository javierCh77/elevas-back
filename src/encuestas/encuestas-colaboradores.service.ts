// src/encuestas-colaboradores/encuestas-colaboradores.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborador } from './entities/colaborador.entity';
import { Respuesta } from './entities/respuesta.entity';
import { RespuestaMultiple } from './entities/respuesta-multiple.entity';
import { RespuestaLikert } from './entities/respuesta-likert.entity';
import { Capacitacion } from './entities/capacitacion.entity';
import { CreateEncuestaCompletaDto } from './dto/create-encuesta-completa.dto';

@Injectable()
export class EncuestasColaboradoresService {
  constructor(
    @InjectRepository(Colaborador)
    private readonly colaboradorRepo: Repository<Colaborador>,
    @InjectRepository(Respuesta)
    private readonly respuestaRepo: Repository<Respuesta>,
    @InjectRepository(RespuestaMultiple)
    private readonly multipleRepo: Repository<RespuestaMultiple>,
    @InjectRepository(RespuestaLikert)
    private readonly likertRepo: Repository<RespuestaLikert>,
    @InjectRepository(Capacitacion)
    private readonly capacitacionRepo: Repository<Capacitacion>,
  ) {}

  async createEncuestaCompleta(dto: CreateEncuestaCompletaDto) {
    const colaborador = await this.colaboradorRepo.save(dto.colaborador);

    const respuesta = this.respuestaRepo.create({ ...dto.respuesta, colaborador });
    await this.respuestaRepo.save(respuesta);

    const multiples = dto.respuestasMultiples.map(rm => this.multipleRepo.create({ ...rm, colaborador }));
    await this.multipleRepo.save(multiples);

    const likerts = dto.respuestasLikert.map(rl => this.likertRepo.create({ ...rl, colaborador }));
    await this.likertRepo.save(likerts);

    const capacitacion = this.capacitacionRepo.create({ ...dto.capacitacion, colaborador });
    await this.capacitacionRepo.save(capacitacion);

    return { message: 'Encuesta registrada correctamente' };
  }

  async getResultados() {
    return this.colaboradorRepo.find({
      relations: ['respuestas', 'respuestasMultiples', 'respuestasLikert', 'capacitaciones'],
      order: { nombre: 'ASC' },
    });
  }
}

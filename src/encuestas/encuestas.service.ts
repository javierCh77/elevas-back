// src/encuesta/encuestas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encuesta } from './entities/encuesta.entity';
import { Pregunta } from './entities/pregunta.entity';
import { OpcionRespuesta } from './entities/opcion-respuesta.entity';
import { Respuesta } from './entities/respuesta.entity';
import { Empleado } from '../empleados/entities/empleado.entity';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { SubmitRespuestaDto } from './dto/submit-respuesta.dto';

@Injectable()
export class EncuestasService {
  constructor(
    @InjectRepository(Encuesta)
    private readonly encuestaRepo: Repository<Encuesta>,

    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,

    @InjectRepository(OpcionRespuesta)
    private readonly opcionRepo: Repository<OpcionRespuesta>,

    @InjectRepository(Respuesta)
    private readonly respuestaRepo: Repository<Respuesta>,

    @InjectRepository(Empleado)
    private readonly empleadoRepo: Repository<Empleado>,
  ) {}

  async create(dto: CreateEncuestaDto) {
    const encuesta = this.encuestaRepo.create({
      titulo: dto.titulo,
      empresa: { id: dto.empresaId },
    });
    return this.encuestaRepo.save(encuesta);
  }

  async findAll() {
    return this.encuestaRepo.find({ relations: ['empresa'] });
  }

  async findOne(id: string) {
    return this.encuestaRepo.findOne({
      where: { id },
      relations: ['empresa', 'preguntas', 'preguntas.opciones'],
    });
  }

  async update(id: string, dto: UpdateEncuestaDto) {
    const encuesta = await this.encuestaRepo.findOneBy({ id });
    if (!encuesta) throw new NotFoundException('Encuesta no encontrada');
    Object.assign(encuesta, dto);
    return this.encuestaRepo.save(encuesta);
  }

  async remove(id: string) {
    const encuesta = await this.encuestaRepo.findOneBy({ id });
    if (!encuesta) throw new NotFoundException('Encuesta no encontrada');
    return this.encuestaRepo.remove(encuesta);
  }

  async submitRespuestas(dto: SubmitRespuestaDto) {
    const encuesta = await this.encuestaRepo.findOneBy({ id: dto.encuestaId });
    const empleado = await this.empleadoRepo.findOneBy({ id: dto.empleadoId });

    if (!encuesta) throw new NotFoundException('Encuesta no encontrada');
    if (!empleado) throw new NotFoundException('Empleado no encontrado');

    const respuestas = dto.respuestas.map((r) => {
      return this.respuestaRepo.create({
        encuesta,
        pregunta: { id: r.preguntaId },
        empleado,
        respuesta: Array.isArray(r.respuesta) ? JSON.stringify(r.respuesta) : r.respuesta,
      });
    });

    return this.respuestaRepo.save(respuestas);
  }
  
  
  
  
  async getRespuestasPorEmpleado(empleadoId: string) {
    const empleado = await this.empleadoRepo.findOneBy({ id: empleadoId });
    if (!empleado) throw new NotFoundException('Empleado no encontrado');

    return this.respuestaRepo.find({
      where: { empleado: { id: empleadoId } },
      relations: ['pregunta', 'encuesta'],
    });
  }
}

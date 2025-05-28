import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoRRHH } from './entities/eventos-rrhh.entity';
import { CreateEventoRRHHDto } from './dto/create-evento-rrhh.dto';
import { UpdateEventoRRHHDto } from './dto/update-evento-rrhh.dto';
import { Empleado } from '../empleados/entities/empleado.entity';
import { User } from '../users/entities/user.entity';
import { FindOptionsWhere, ILike } from 'typeorm';

@Injectable()
export class EventosRRHHService {
  constructor(
    @InjectRepository(EventoRRHH) private eventoRepo: Repository<EventoRRHH>,
    @InjectRepository(Empleado) private empleadoRepo: Repository<Empleado>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll(filters?: {
    tipo?: string;
    estado?: string;
    empleadoId?: string;
  }): Promise<EventoRRHH[]> {
    const where: FindOptionsWhere<EventoRRHH> = {};

    if (filters?.tipo) {
      where.tipo = filters.tipo;
    }

    if (filters?.estado) {
      where.estado = filters.estado as any;
    }

    if (filters?.empleadoId) {
      where.empleado = { id: filters.empleadoId };
    }

    return this.eventoRepo.find({
      where,
      relations: ['empleado', 'creadoPor'],
      order: { fechaInicio: 'DESC' },
    });
  }

  async findOne(id: string) {
    const evento = await this.eventoRepo.findOne({
      where: { id },
      relations: ['empleado', 'creadoPor'],
    });
    if (!evento) throw new NotFoundException('Evento no encontrado');
    return evento;
  }

  async create(dto: CreateEventoRRHHDto): Promise<EventoRRHH> {
    const creadoPor = await this.userRepo.findOne({
      where: { id: dto.creadoPorId },
    });
    if (!creadoPor)
      throw new NotFoundException('Usuario creador no encontrado');

    let empleado: Empleado | null = null;
    if (dto.empleadoId) {
      empleado = await this.empleadoRepo.findOne({
        where: { id: dto.empleadoId },
      });
      if (!empleado) throw new NotFoundException('Empleado no encontrado');
    }

    const evento = this.eventoRepo.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      tipo: dto.tipo,
      fechaInicio: new Date(dto.fechaInicio),
      fechaFin: new Date(dto.fechaFin),
      estado: dto.estado ?? 'pendiente',
      creadoPor,
      empleado,
    });

    return this.eventoRepo.save(evento);
  }

  async update(id: string, dto: UpdateEventoRRHHDto) {
    const evento = await this.findOne(id);

    if (dto.empleadoId) {
      const empleado = await this.empleadoRepo.findOneBy({
        id: dto.empleadoId,
      });
      if (!empleado) throw new NotFoundException('Empleado no encontrado');
      evento.empleado = empleado;
    }

    Object.assign(evento, dto);
    return this.eventoRepo.save(evento);
  }

  async remove(id: string) {
    const evento = await this.findOne(id);
    return this.eventoRepo.remove(evento);
  }
}

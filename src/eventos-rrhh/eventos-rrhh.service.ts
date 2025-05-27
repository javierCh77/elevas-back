import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventoRRHH } from "./entities/eventos-rrhh.entity";
import { CreateEventoRRHHDto } from "./dto/create-evento-rrhh.dto";
import { UpdateEventoRRHHDto } from "./dto/update-evento-rrhh.dto";
import { Empleado } from "../empleados/entities/empleado.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class EventosRRHHService {
  constructor(
    @InjectRepository(EventoRRHH) private eventoRepo: Repository<EventoRRHH>,
    @InjectRepository(Empleado) private empleadoRepo: Repository<Empleado>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.eventoRepo.find({
      relations: ["empleado", "creadoPor"],
      order: { fechaInicio: "DESC" },
    });
  }

  async findOne(id: string) {
    const evento = await this.eventoRepo.findOne({
      where: { id },
      relations: ["empleado", "creadoPor"],
    });
    if (!evento) throw new NotFoundException("Evento no encontrado");
    return evento;
  }

  async create(dto: CreateEventoRRHHDto) {
    const creadoPor = await this.userRepo.findOneBy({ id: dto.creadoPorId });
    if (!creadoPor) throw new NotFoundException("Usuario no encontrado");

    const empleado = dto.empleadoId
      ? await this.empleadoRepo.findOneBy({ id: dto.empleadoId })
      : null;

    const evento = this.eventoRepo.create({
      ...dto,
      empleado,
      creadoPor,
    });

    return this.eventoRepo.save(evento);
  }

  async update(id: string, dto: UpdateEventoRRHHDto) {
    const evento = await this.findOne(id);

    if (dto.empleadoId) {
      const empleado = await this.empleadoRepo.findOneBy({ id: dto.empleadoId });
      if (!empleado) throw new NotFoundException("Empleado no encontrado");
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

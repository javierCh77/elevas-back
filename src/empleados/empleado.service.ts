// src/empleados/empleado.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { Empresa } from '../empresas/entities/empresa.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado) private empleadoRepo: Repository<Empleado>,
    @InjectRepository(Empresa) private empresaRepo: Repository<Empresa>,
  ) {}

  async findAll() {
    // 👇 solo empresa, quitamos reportaA
    return this.empleadoRepo.find({ relations: ['empresa'] });
  }

  async findOne(id: string) {
    const empleado = await this.empleadoRepo.findOne({
      where: { id },
      relations: ['empresa'], // 👈 quitamos reportaA
    });
    if (!empleado) throw new NotFoundException('Empleado no encontrado');
    return empleado;
  }

  async create(dto: CreateEmpleadoDto, file?: Express.Multer.File) {
    const empresa = await this.empresaRepo.findOne({ where: { id: dto.empresaId } });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');

    const entity = this.empleadoRepo.create({
      ...dto,
      empresa,
      // IMPORTANTE: file.filename existe SOLO si usás diskStorage (ver sección 2)
      imagenPerfil: file ? `/uploads/${file.filename}` : null,
    });

    // 👇 Quitamos lógica de reportaAId
    // if ((dto as any).reportaAId) { ... }

    return this.empleadoRepo.save(entity);
  }

  async update(id: string, dto: UpdateEmpleadoDto, file?: Express.Multer.File) {
    const empleado = await this.findOne(id);

    // relaciones primero (solo empresa)
    if (dto.empresaId) {
      const empresa = await this.empresaRepo.findOne({ where: { id: dto.empresaId } });
      if (!empresa) throw new NotFoundException('Empresa no encontrada');
      empleado.empresa = empresa;
    }

    // 👇 Quitamos lógica de reportaAId
    // if ((dto as any).reportaAId !== undefined) { ... }

    // campos simples (no pisar con undefined)
    Object.entries(dto).forEach(([k, v]) => {
      if (v !== undefined && k !== 'empresaId') {
        (empleado as any)[k] = v === '' ? null : v;
      }
    });

    // imagen
    if (file) {
      empleado.imagenPerfil = `/uploads/${file.filename}`;
    }
    if ((dto as any).eliminarImagen === 'true') {
      empleado.imagenPerfil = null;
    }

    return this.empleadoRepo.save(empleado);
  }

  async remove(id: string) {
    const empleado = await this.findOne(id);
    return this.empleadoRepo.remove(empleado);
  }
}

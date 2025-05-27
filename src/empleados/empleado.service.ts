import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empresa } from '../empresas/entities/empresa.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepo: Repository<Empleado>,
    @InjectRepository(Empresa)
    private empresaRepo: Repository<Empresa>
  ) {}

  async findAll() {
    return await this.empleadoRepo.find();
  }

  async findOne(id: string) {
    const empleado = await this.empleadoRepo.findOne({ where: { id } });
    if (!empleado) throw new NotFoundException('Empleado no encontrado');
    return empleado;
  }

  async create(dto: CreateEmpleadoDto) {
    const empresa = await this.empresaRepo.findOne({ where: { id: dto.empresaId } });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');

    const nuevo = this.empleadoRepo.create({ ...dto, empresa });
    return this.empleadoRepo.save(nuevo);
  }

  async update(id: string, dto: UpdateEmpleadoDto) {
    const empleado = await this.findOne(id);
    if (dto.empresaId) {
      const empresa = await this.empresaRepo.findOne({ where: { id: dto.empresaId } });
      if (!empresa) throw new NotFoundException('Empresa no encontrada');
      empleado.empresa = empresa;
    }

    Object.assign(empleado, dto);
    return this.empleadoRepo.save(empleado);
  }

  async remove(id: string) {
    const empleado = await this.findOne(id);
    return this.empleadoRepo.remove(empleado);
  }
}

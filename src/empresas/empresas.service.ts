import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepo: Repository<Empresa>
  ) {}

  async findAll() {
    return await this.empresaRepo.find();
  }

  async findOne(id: string) {
    const empresa = await this.empresaRepo.findOne({ where: { id } });
    if (!empresa) throw new NotFoundException('Empresa no encontrada');
    return empresa;
  }

  async create(dto: CreateEmpresaDto) {
    const nueva = this.empresaRepo.create(dto);
    return this.empresaRepo.save(nueva);
  }

  async update(id: string, dto: UpdateEmpresaDto) {
    const empresa = await this.findOne(id);
    Object.assign(empresa, dto);
    return this.empresaRepo.save(empresa);
  }

  async remove(id: string) {
    const empresa = await this.findOne(id);
    return this.empresaRepo.remove(empresa);
  }
}

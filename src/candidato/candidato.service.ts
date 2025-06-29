import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidato } from './entities/candidato.entity';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';

@Injectable()
export class CandidatoService {
  constructor(
    @InjectRepository(Candidato)
    private candidatoRepository: Repository<Candidato>,
  ) {}

async create(dto: CreateCandidatoDto): Promise<Candidato> {
  const candidato = this.candidatoRepository.create(dto);

  try {
    return await this.candidatoRepository.save(candidato);
  } catch (error) {
    if (error.code === '23505') {
      throw new ConflictException('Ya existe un candidato con ese DNI');
    }
    throw error;
  }
}

  findAll(): Promise<Candidato[]> {
    return this.candidatoRepository.find();
  }

  async findOne(id: string): Promise<Candidato> {
    const candidato = await this.candidatoRepository.findOneBy({ id });
    if (!candidato) {
      throw new NotFoundException('Candidato no encontrado');
    }
    return candidato;
  }

  async update(id: string, dto: UpdateCandidatoDto): Promise<Candidato> {
    const candidato = await this.findOne(id);
    const actualizado = this.candidatoRepository.merge(candidato, dto);
    return this.candidatoRepository.save(actualizado);
  }

  async remove(id: string): Promise<void> {
    const candidato = await this.findOne(id);
    await this.candidatoRepository.remove(candidato);
  }
}

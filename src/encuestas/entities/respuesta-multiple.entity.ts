// src/encuestas-colaboradores/entities/respuesta-multiple.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Colaborador } from './colaborador.entity';

@Entity('respuestas_multiple')
export class RespuestaMultiple {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pregunta: string;

  @Column()
  opcion: string;

  @ManyToOne(() => Colaborador)
  colaborador: Colaborador;
}
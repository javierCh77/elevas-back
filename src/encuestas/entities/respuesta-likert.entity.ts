// src/encuestas-colaboradores/entities/respuesta-likert.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Colaborador } from './colaborador.entity';

@Entity('respuestas_likert')
export class RespuestaLikert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enunciado: string;

  @Column()
  valor: string;

  @ManyToOne(() => Colaborador)
  colaborador: Colaborador;
}
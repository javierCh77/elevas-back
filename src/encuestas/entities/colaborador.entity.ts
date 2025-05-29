// src/encuestas-colaboradores/entities/colaborador.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Respuesta } from './respuesta.entity';
import { RespuestaMultiple } from './respuesta-multiple.entity';
import { RespuestaLikert } from './respuesta-likert.entity';
import { Capacitacion } from './capacitacion.entity';

@Entity('colaboradores')
export class Colaborador {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  cargo: string;

  @Column()
  antiguedad: string;

  @Column()
  empresa: string;

  @OneToMany(() => Respuesta, r => r.colaborador)
  respuestas: Respuesta[];

  @OneToMany(() => RespuestaMultiple, rm => rm.colaborador)
  respuestasMultiples: RespuestaMultiple[];

  @OneToMany(() => RespuestaLikert, rl => rl.colaborador)
  respuestasLikert: RespuestaLikert[];

  @OneToMany(() => Capacitacion, c => c.colaborador)
  capacitaciones: Capacitacion[];
}
// src/encuestas-colaboradores/entities/capacitacion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Colaborador } from './colaborador.entity';

@Entity('capacitaciones')
export class Capacitacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  asistio: boolean;

  @Column()
  utilidad: string;

  @Column()
  deseaMas: string;

  @Column('text', { array: true })
  temasInteres: string[];

  @ManyToOne(() => Colaborador)
  colaborador: Colaborador;
}

// src/encuestas-colaboradores/entities/respuesta.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Colaborador } from './colaborador.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Colaborador, c => c.respuestas)
  colaborador: Colaborador;

  @Column('int')
  recomiendaEmpresa: number;

  @Column()
  satisfaccion: string;

  @Column()
  tiempoEnEmpresa: string;

  @Column('int')
  recomiendaProductos: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
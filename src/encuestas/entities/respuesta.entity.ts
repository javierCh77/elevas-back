import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { Encuesta } from './encuesta.entity';
import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.respuestas, { onDelete: 'CASCADE' })
  encuesta: Encuesta;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuestas, { onDelete: 'CASCADE' })
  pregunta: Pregunta;

  @ManyToOne(() => Empleado, { eager: true })
  empleado: Empleado;

  @Column('text')
  respuesta: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;
}

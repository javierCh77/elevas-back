// src/encuesta/entities/opcion-respuesta.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pregunta } from './pregunta.entity';

@Entity('opciones_respuesta')
export class OpcionRespuesta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  texto: string;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.opciones, {
    onDelete: 'CASCADE',
  })
  pregunta: Pregunta;
}

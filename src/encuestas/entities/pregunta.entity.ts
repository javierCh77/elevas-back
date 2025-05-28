// src/encuesta/entities/pregunta.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Encuesta } from './encuesta.entity';
import { OpcionRespuesta } from './opcion-respuesta.entity';
import { Respuesta } from './respuesta.entity';

export enum TipoPregunta {
  TEXTO = 'texto',
  OPCION_UNICA = 'opcion_unica',
  OPCION_MULTIPLE = 'opcion_multiple',
  ESCALA = 'escala',
}

@Entity('preguntas')
export class Pregunta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  texto: string;

  @Column({ type: 'enum', enum: TipoPregunta })
  tipo: TipoPregunta;

  @Column()
  orden: number;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas, { onDelete: 'CASCADE' })
  encuesta: Encuesta;

  @OneToMany(() => OpcionRespuesta, (opcion) => opcion.pregunta, { cascade: true })
  opciones: OpcionRespuesta[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.pregunta)
  respuestas: Respuesta[];
}
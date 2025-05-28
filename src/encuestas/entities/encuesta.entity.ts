import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { Respuesta } from './respuesta.entity';
import { Empresa } from '../../empresas/entities/empresa.entity'; // si tenés relación con empresa

@Entity('encuestas')
export class Encuesta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.encuestas, { nullable: true })
  empresa?: Empresa;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, { cascade: true })
  preguntas: Pregunta[];

  @OneToMany(() => Respuesta, (respuesta) => respuesta.encuesta) // 👈 ESTA ES CLAVE
  respuestas: Respuesta[];

}

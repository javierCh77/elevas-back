import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Candidato {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombreCompleto: string;

  @Column({ nullable: true })
  email: string;

  @Column({ unique: true })
  dni: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  ubicacion: string;

  @Column('text', { array: true, nullable: true })
  habilidades: string[];

  @Column('text', { array: true, nullable: true })
  idiomas: string[];

  @Column({ nullable: true })
  nivelEstudios: string;

  @Column({ nullable: true })
  tituloObtenido: string;

  @Column({ nullable: true })
  institucion: string;

  @Column('jsonb', { nullable: true })
  experiencia: any; // más adelante se puede modelar como entidad relacionada

  @Column({ nullable: true })
  pretensionSalarial: string;

  @Column({ nullable: true })
  disponibilidad: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column('text', { nullable: true })
  observaciones: string;

  @Column({ nullable: true })
  urlCv: string;
}

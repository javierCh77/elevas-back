import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cv {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombreCompleto: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @Column({ type: 'text' })
  experiencia: string;

  @Column({ type: 'text', nullable: true })
  educacion?: string;

  @Column({ type: 'text', nullable: true })
  habilidades?: string;

  @CreateDateColumn()
  creadoEn: Date;
}

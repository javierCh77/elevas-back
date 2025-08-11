import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';

export enum EstadoEmpresa {
  ACTIVA = 'ACTIVA',
  INACTIVA = 'INACTIVA',
}

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Identidad legal y comercial
  @Column({ length: 160 })
  razonSocial: string;

  @Column({ length: 160, nullable: true })
  nombreFantasia: string | null;

  @Index({ unique: true })
  @Column({ length: 20 })
  cuit: string;

  // Contacto
  @Column({ nullable: true })
  email: string | null;

  @Column({ nullable: true })
  telefono: string | null;

  // Ubicación
  @Column({ nullable: true })
  direccion: string | null;

  @Column({ nullable: true })
  localidad: string | null;

  @Column({ nullable: true })
  provincia: string | null;

  @Column({ nullable: true, default: 'Argentina' })
  pais: string | null;

  @Column({ nullable: true })
  codigoPostal?: string | null;

  // Extra
  @Column({ nullable: true })
  sitioWeb?: string | null;

  @Column({ nullable: true })
  logoUrl?: string | null;

  @Column({ nullable: true })
  industria?: string | null; // rubro/sector

  // Config RRHH por defecto (opcional, los empleados pueden sobreescribir)
  @Column({ nullable: true })
  convenioColectivoDefault?: string | null;

  @Column({ type: 'enum', enum: EstadoEmpresa, default: EstadoEmpresa.ACTIVA })
  estado?: EstadoEmpresa;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @OneToMany(() => Empleado, (empleado) => empleado.empresa)
  empleados: Empleado[];
}

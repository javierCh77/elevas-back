import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { Empresa } from '../../empresas/entities/empresa.entity';

export enum EstadoCivil {
  SOLTERO = 'SOLTERO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUDO = 'VIUDO',
  UNION_CONVIVENCIAL = 'UNION_CONVIVENCIAL',
  OTRO = 'OTRO',
}

export enum EstadoLaboral {
  ACTIVO = 'ACTIVO',
  LICENCIA = 'LICENCIA',
  SUSPENDIDO = 'SUSPENDIDO',
  BAJA = 'BAJA',
}

export enum ModalidadTrabajo {
  PRESENCIAL = 'PRESENCIAL',
  REMOTO = 'REMOTO',
  HIBRIDO = 'HIBRIDO',
}

export enum TipoContrato {
  INDETERMINADO = 'INDETERMINADO',
  PLAZO_FIJO = 'PLAZO_FIJO',
  EVENTUAL = 'EVENTUAL',
  PASANTIA = 'PASANTIA',
  MONOTRIBUTO = 'MONOTRIBUTO',
  HONORARIOS = 'HONORARIOS',
}

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ length: 20 })
  cuil: string;

  @Column({ length: 80 })
  nombre: string;

  @Column({ length: 80 })
  apellido: string;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date | null;

  @Column({ type: 'enum', enum: EstadoCivil, nullable: true })
  estadoCivil: EstadoCivil | null;

  @Column({ nullable: true })
  direccion: string | null;

  @Column({ nullable: true })
  telefono: string | null;

  @Index()
  @Column({ nullable: true })
  emailPersonal: string | null;

  @Index()
  @Column({ nullable: true })
  emailLaboral: string | null;

  @Column({ nullable: true })
  imagenPerfil: string | null;

  @ManyToOne(() => Empresa, { eager: true, nullable: false })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Index()
  @Column({ type: 'enum', enum: EstadoLaboral, default: EstadoLaboral.ACTIVO })
  estadoActual: EstadoLaboral;

  @Index()
  @Column({ type: 'date', nullable: true })
  fechaIngreso: Date | null;

  @Index()
  @Column({ type: 'date', nullable: true })
  fechaBaja: Date | null;

  @Column({ nullable: true })
  area: string | null;

  @Column({ nullable: true })
  puesto: string | null;

  @Column({ type: 'enum', enum: ModalidadTrabajo, nullable: true })
  modalidad: ModalidadTrabajo | null;

  @Column({ nullable: true })
  turnoJornada: string | null;

  @ManyToOne(() => Empleado, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reportaAId' })
  reportaA: Empleado | null;

  @Column({ type: 'enum', enum: TipoContrato, nullable: true })
  tipoContrato: TipoContrato | null;

  @Column({ nullable: true })
  obraSocial: string | null;

  @Column({ nullable: true })
  convenioColectivo: string | null;

  @Column({ nullable: true })
  dni: string | null;

  @Column({ type: 'varchar', nullable: true })
  cvUrl: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

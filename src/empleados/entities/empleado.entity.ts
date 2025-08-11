import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Empresa } from '../../empresas/entities/empresa.entity';

// Enums sugeridos (ajústalos a tu realidad)
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

  // Identificación
  @Index({ unique: true })
  @Column({ length: 20 })
  cuil: string;

  @Column({ length: 80 })
  nombre: string;

  @Column({ length: 80 })
  apellido: string;

  // Datos personales
  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date | null;

  @Column({ type: 'enum', enum: EstadoCivil, nullable: true })
  estadoCivil: EstadoCivil | null;

  // Contacto
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

  // Relación con empresa
  @ManyToOne(() => Empresa, { eager: true, nullable: false })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;



  // Estado y fechas
  @Column({ type: 'enum', enum: EstadoLaboral, default: EstadoLaboral.ACTIVO })
  estadoActual: EstadoLaboral;

  @Column({ type: 'date', nullable: true })
  fechaIngreso: Date | null;

  // Organización
  @Column({ nullable: true })
  area: string | null; // Area/dpto

  @Column({ nullable: true })
  puesto: string | null; // Puesto/rol

  @Column({ type: 'enum', enum: ModalidadTrabajo, nullable: true })
  modalidad: ModalidadTrabajo | null;

  @Column({ nullable: true })
  turnoJornada: string | null; // Ej: "Lun-Vie 9-18", "Noche", etc.

  // Jerarquía: "Reporta a"
  @ManyToOne(() => Empleado, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reportaAId' })
  reportaA: Empleado | null;

  // Contrato y beneficios
  @Column({ type: 'enum', enum: TipoContrato, nullable: true })
  tipoContrato: TipoContrato | null;

  @Column({ nullable: true })
  obraSocial: string | null; // (Podemos migrar luego a relación con ObraSocial)

  @Column({ nullable: true })
  convenioColectivo: string | null;

  // --- Campos previos que ya tenías (si querés mantenerlos)
  @Column({ nullable: true })
  dni: string | null;
}

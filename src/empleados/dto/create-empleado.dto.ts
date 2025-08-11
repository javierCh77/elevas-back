import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsEmail,
  IsUUID,
  IsDateString,
  Length,
} from 'class-validator';
import {
  EstadoCivil,
  EstadoLaboral,
  ModalidadTrabajo,
  TipoContrato,
} from '../entities/empleado.entity';

export class CreateEmpleadoDto {
  // Identificación
  @IsString()
  @IsNotEmpty()
  @Length(8, 20) // Ej: "20-12345678-3" o sólo números
  cuil: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 80)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 80)
  apellido: string;

  // Datos personales
  @IsOptional()
  @IsDateString() // formato ISO: "YYYY-MM-DD"
  fechaNacimiento?: string;

  @IsOptional()
  @IsEnum(EstadoCivil)
  estadoCivil?: EstadoCivil;

  // Contacto
  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  emailPersonal?: string;

  // Imagen (ruta en BD; el archivo va por multipart)
  @IsOptional()
  @IsString()
  imagenPerfil?: string;

  // Relación con empresa (obligatoria)
  @IsUUID()
  @IsNotEmpty()
  empresaId: string;

  // Estado y fechas
  @IsOptional()
  @IsEnum(EstadoLaboral)
  estadoActual?: EstadoLaboral; // default ACTIVO en la entity

  @IsOptional()
  @IsDateString()
  fechaIngreso?: string;

  // Organización
  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  puesto?: string;

  @IsOptional()
  @IsEnum(ModalidadTrabajo)
  modalidad?: ModalidadTrabajo;

  @IsOptional()
  @IsString()
  turnoJornada?: string;

  // Contrato y beneficios
  @IsOptional()
  @IsEnum(TipoContrato)
  tipoContrato?: TipoContrato;

  @IsOptional()
  @IsString()
  obraSocial?: string;

  @IsOptional()
  @IsString()
  convenioColectivo?: string;

  // Campo previo (opcional)
  @IsOptional()
  @IsString()
  dni?: string;
}

import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUUID, IsString } from "class-validator";

export enum TipoEventoRRHH {
  ALTA = "alta_empleado",
  BAJA = "baja_empleado",
  RENOVACION = "renovacion_contrato",
  FIN_PRUEBA = "fin_periodo_prueba",
  ENTREGA = "entrega_indumentaria",
  LICENCIA = "licencia",
  ENTREVISTA = "entrevista",
  EVALUACION = "evaluacion",
  CAPACITACION = "capacitacion",
  ALERTA = "alerta_documental",
  OTRO = "otro",
}

export class CreateEventoRRHHDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(TipoEventoRRHH)
  tipo: TipoEventoRRHH;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsOptional()
  @IsString()
  estado?: "pendiente" | "realizado" | "cancelado";

  @IsOptional()
  @IsUUID()
  empleadoId?: string;

  @IsUUID()
  creadoPorId: string;
}

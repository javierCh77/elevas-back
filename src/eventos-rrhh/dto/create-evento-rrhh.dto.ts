import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventoRRHHDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum([
    "alta_empleado",
    "baja_empleado",
    "renovacion_contrato",
    "fin_periodo_prueba",
    "entrega_indumentaria",
    "licencia",
    "entrevista",
    "evaluacion",
    "capacitacion",
    "alerta_documental",
    "otro",
  ])
  tipo: string;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsOptional()
  @IsString()
  estado?: "pendiente" | "realizado" | "cancelado";

  @IsOptional()
  @IsString()
  empleadoId?: string;

  @IsString()
  creadoPorId: string;
}

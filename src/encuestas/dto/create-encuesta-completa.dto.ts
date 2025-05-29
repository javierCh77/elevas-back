// src/encuestas-colaboradores/dto/create-encuesta-completa.dto.ts
import { IsArray, IsBoolean, IsEmail, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateColaboradorDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  cargo: string;

  @IsString()
  antiguedad: string;

  @IsString()
  empresa: string;
}

export class CreateRespuestaDto {
  @IsInt()
  recomiendaEmpresa: number;

  @IsString()
  satisfaccion: string;

  @IsString()
  tiempoEnEmpresa: string;

  @IsInt()
  recomiendaProductos: number;
}

export class CreateRespuestaMultipleDto {
  @IsString()
  pregunta: string;

  @IsString()
  opcion: string;
}

export class CreateRespuestaLikertDto {
  @IsString()
  enunciado: string;

  @IsString()
  valor: string;
}

export class CreateCapacitacionDto {
  @IsBoolean()
  asistio: boolean; // <- antes era string

  @IsString()
  utilidad: string;

  @IsString()
  deseaMas: string;

  @IsArray()
  @IsString({ each: true })
  temasInteres: string[];
}

export class CreateEncuestaCompletaDto {
  @ValidateNested()
  @Type(() => CreateColaboradorDto)
  colaborador: CreateColaboradorDto;

  @ValidateNested()
  @Type(() => CreateRespuestaDto)
  respuesta: CreateRespuestaDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRespuestaMultipleDto)
  respuestasMultiples: CreateRespuestaMultipleDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRespuestaLikertDto)
  respuestasLikert: CreateRespuestaLikertDto[];

  @ValidateNested()
  @Type(() => CreateCapacitacionDto)
  capacitacion: CreateCapacitacionDto;
}
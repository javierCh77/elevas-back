// src/respuesta-encuesta/dto/create-respuesta-encuesta.dto.ts
import { IsString, IsNotEmpty, IsObject } from "class-validator";

export class CreateRespuestaEncuestaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsNotEmpty()
  nombreEmpresa: string;

  @IsObject()
  respuestas: {
    trabajoValorado: string;
    claridadObjetivos: string;
    comodidadFeedback: string;
    culturaUnaPalabra: string;
    recomendariaEmpresa: string;
    recursosDisponibles: string;
    capacitacionesUtiles: string;
    equilibrioVidaLaboral: string;
    opinionTenidaEnCuenta: string;
    oportunidadesDesarrollo: string;
  };
}

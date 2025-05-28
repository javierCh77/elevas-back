// src/encuesta/dto/submit-respuesta.dto.ts
import { IsUUID, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RespuestaIndividualDto {
  @IsUUID()
  preguntaId: string;

  @IsString()
  respuesta: string; // Puede ser un string plano o un JSON serializado en caso de opción múltiple
}

export class SubmitRespuestaDto {
  @IsUUID()
  encuestaId: string;

  @IsUUID()
  empleadoId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RespuestaIndividualDto)
  respuestas: RespuestaIndividualDto[];
}

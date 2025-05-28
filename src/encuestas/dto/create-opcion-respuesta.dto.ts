// src/encuesta/dto/create-opcion-respuesta.dto.ts
import { IsString } from 'class-validator';

export class CreateOpcionRespuestaDto {
  @IsString()
  texto: string;
}

// src/encuesta/dto/submit-respuesta.dto.ts
import { IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class RespuestaIndividualDto {
  @IsUUID()
  preguntaId: string;

  @IsString({ each: true })
  respuesta: string | string[];
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

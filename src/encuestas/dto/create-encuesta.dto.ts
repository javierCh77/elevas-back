// src/encuesta/dto/create-encuesta.dto.ts
import { IsString, IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePreguntaDto } from './create-pregunta.dto';

export class CreateEncuestaDto {
  @IsString()
  titulo: string;

  @IsUUID()
  empresaId: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreatePreguntaDto)
  // preguntas: CreatePreguntaDto[];
}
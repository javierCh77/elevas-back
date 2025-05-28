// src/encuesta/dto/create-pregunta.dto.ts
import { IsString, IsEnum, IsNumber, IsOptional, IsArray, IsUUID } from 'class-validator';
import { TipoPregunta } from '../entities/pregunta.entity';

export class CreatePreguntaDto {

  @IsUUID()
  encuestaId: string; 


  @IsString()
  texto: string;

  @IsEnum(TipoPregunta)
  tipo: TipoPregunta;

  @IsNumber()
  orden: number;

  @IsOptional()
  @IsArray()
  opciones?: string[];
  
  
  
  
}
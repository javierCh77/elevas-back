// src/encuesta/dto/update-encuesta.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateEncuestaDto } from './create-encuesta.dto';

export class UpdateEncuestaDto extends PartialType(CreateEncuestaDto) {}
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCandidatoDto {
  @IsNotEmpty()
  nombreCompleto?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  dni?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  ubicacion?: string;

  @IsOptional()
  @IsArray()
  habilidades?: string[];

  @IsOptional()
  @IsArray()
  idiomas?: string[];

  @IsOptional()
  nivelEstudios?: string;

  @IsOptional()
  tituloObtenido?: string;

  @IsOptional()
  institucion?: string;

  @IsOptional()
  experiencia?: any;

  @IsOptional()
  pretensionSalarial?: string;

  @IsOptional()
  disponibilidad?: string;

  @IsOptional()
  linkedin?: string;

  @IsOptional()
  observaciones?: string;

  @IsOptional()
  urlCv?: string;
}

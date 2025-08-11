// src/empresas/dto/create-empresa.dto.ts
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Length,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { EstadoEmpresa } from '../entities/empresa.entity';

// Helper para transformar string vacío en undefined
const EmptyToUndef = () =>
  Transform(({ value }) => (value === '' ? undefined : value));

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 160)
  razonSocial: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  cuit: string;

  @IsOptional()
  @IsString()
  @Length(1, 160)
  @EmptyToUndef()
  nombreFantasia?: string | null;

  @IsOptional()
  @IsEmail()
  @EmptyToUndef()
  email?: string | null;

  @IsOptional()
  @IsString()
  @EmptyToUndef()
  telefono?: string | null;

  @IsOptional()
  @IsString()
  @EmptyToUndef()
  direccion?: string | null;

  @IsOptional()
  @IsString()
  @EmptyToUndef()
  localidad?: string | null;

  @IsOptional()
  @IsString()
  @EmptyToUndef()
  provincia?: string | null;

  @IsOptional()
  @IsString()
  @EmptyToUndef()
  pais?: string | null;

  @IsOptional()
  @IsString()
  @EmptyToUndef()
  codigoPostal?: string | null;

  @IsOptional()
  @IsUrl()
  @EmptyToUndef()
  sitioWeb?: string | null;

  @IsOptional()
  @IsUrl()
  @EmptyToUndef()
  logoUrl?: string | null;

  @IsOptional()
  @IsString()
  @EmptyToUndef()
  industria?: string | null;

  @IsOptional()
  @IsString()
  @EmptyToUndef()
  convenioColectivoDefault?: string | null;

  @IsOptional()
  @IsEnum(EstadoEmpresa)
  estado?: EstadoEmpresa;
}

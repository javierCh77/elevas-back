import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ExplicacionComparativaDto {
  @IsArray()
  @IsNotEmpty()
  candidatos: any[]; // deberían ser exactamente 3 candidatos

  @IsOptional()
  @IsString()
  puesto?: string;

  @IsOptional()
  @IsString()
  formacionAcademica?: string;

  @IsOptional()
  @IsString()
  experienciaLaboral?: string;

  @IsOptional()
  @IsString()
  conocimientosEspecificos?: string;

  @IsOptional()
  @IsString()
  idioma?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;
}

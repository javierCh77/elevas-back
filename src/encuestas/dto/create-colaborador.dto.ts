// src/encuestas-colaboradores/dto/create-colaborador.dto.ts
import { IsEmail, IsString } from 'class-validator';

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

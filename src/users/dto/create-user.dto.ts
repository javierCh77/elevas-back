import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { IsEmail, IsString } from 'class-validator';



export enum RolUsuario {
  DESARROLLADOR = 'desarrollador',
  ADMINISTRACION = 'administracion',
  PRESTADOR = 'prestador',
  CONTABILIDAD = 'contabilidad',
  GERENCIA = 'gerencia',
}





export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  dni: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  celular: string;


  @IsEnum(RolUsuario, { message: 'Rol inválido' })
  rol: RolUsuario;
}
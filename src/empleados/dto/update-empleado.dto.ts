import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional } from 'class-validator';
import { CreateEmpleadoDto } from './create-empleado.dto';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
  // Para poder borrar la imagen desde el front (form-data)
  @IsOptional()
  @IsIn(['true', 'false'])
  eliminarImagen?: string;
}

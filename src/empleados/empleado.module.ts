import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Empresa } from '../empresas/entities/empresa.entity';
import { EmpleadoService } from './empleado.service';
import { EmpleadosController } from './empleado.controller'; // 👈 nombre correcto

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Empresa])],
  controllers: [EmpleadosController], // 👈 nombre correcto
  providers: [EmpleadoService],
  exports: [EmpleadoService],
})
export class EmpleadoModule {}

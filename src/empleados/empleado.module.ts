import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Empresa } from '../empresas/entities/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Empresa])],
  providers: [EmpleadoService],
  controllers: [EmpleadoController],
  exports: [TypeOrmModule, Empleado], // 👈 necesario
})
export class EmpleadoModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Empleado } from '../empleados/entities/empleado.entity'; // ajustá la ruta
import { Empresa } from '../empresas/entities/empresa.entity';    // ajustá la ruta

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Empresa])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

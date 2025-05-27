import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventoRRHH } from "./entities/eventos-rrhh.entity";
import { Empleado } from "../empleados/entities/empleado.entity";
import { User } from "../users/entities/user.entity";
import { EventosRRHHService } from "./eventos-rrhh.service";
import { EventosRRHHController } from "./eventos-rrhh.controller";
import { UsersModule } from "../users/users.module";
import { EmpleadoModule } from "../empleados/empleado.module"; // ✅ corregido path

@Module({
  imports: [
    TypeOrmModule.forFeature([EventoRRHH, Empleado, User]),
    EmpleadoModule,
    UsersModule,
  ],
  controllers: [EventosRRHHController],
  providers: [EventosRRHHService],
})
export class EventosRRHHModule {}

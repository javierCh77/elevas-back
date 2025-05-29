// src/encuestas-colaboradores/encuestas-colaboradores.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncuestasColaboradoresController } from './encuestas-colaboradores.controller';
import { EncuestasColaboradoresService } from './encuestas-colaboradores.service';
import { Colaborador } from './entities/colaborador.entity';
import { Respuesta } from './entities/respuesta.entity';
import { RespuestaMultiple } from './entities/respuesta-multiple.entity';
import { RespuestaLikert } from './entities/respuesta-likert.entity';
import { Capacitacion } from './entities/capacitacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colaborador, Respuesta, RespuestaMultiple, RespuestaLikert, Capacitacion])],
  controllers: [EncuestasColaboradoresController],
  providers: [EncuestasColaboradoresService],
})
export class EncuestasColaboradoresModule {}
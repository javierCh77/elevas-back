// src/respuesta-encuesta/respuesta-encuesta.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RespuestaEncuestaService } from './respuesta-encuesta.service';
import { RespuestaEncuestaController } from './respuesta-encuesta.controller';
import { RespuestaEncuesta } from './entities/respuesta-encuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RespuestaEncuesta])],
  providers: [RespuestaEncuestaService],
  controllers: [RespuestaEncuestaController],
})
export class RespuestaEncuestaModule {}

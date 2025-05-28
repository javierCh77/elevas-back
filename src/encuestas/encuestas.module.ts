// src/encuesta/encuestas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncuestasService } from './encuestas.service';
import { EncuestasController } from './encuestas.controller';
import { PreguntasController } from './preguntas.controller';
import { Encuesta } from './entities/encuesta.entity';
import { Pregunta } from './entities/pregunta.entity';
import { Respuesta } from './entities/respuesta.entity';
import { OpcionRespuesta } from './entities/opcion-respuesta.entity';
import { Empleado } from '../empleados/entities/empleado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Encuesta,
      Pregunta,
      Respuesta,
      OpcionRespuesta,
      Empleado,
    ]),
  ],
  controllers: [EncuestasController, PreguntasController],
  providers: [EncuestasService],
})
export class EncuestasModule {}

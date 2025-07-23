import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//modulos a importar que se van a usar
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EmpleadoModule } from './empleados/empleado.module';
import { EventosRRHHModule } from './eventos-rrhh/eventos-rrhh.module';
import { RespuestaEncuestaModule } from './respuesta-encuesta/respuesta-encuesta.module';
import { CandidatoModule } from './candidato/candidato.module';
import { CvModule } from './cv/cv.module';
import { InteligenciaTalentoModule } from './inteligencia-talento/inteligencia-talento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      //la sincronizacion solamente para desarrollo producion no.
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    AuthModule,

    UsersModule,

    EmpresasModule,

    EmpleadoModule,

    EventosRRHHModule,

    RespuestaEncuestaModule,
<<<<<<< HEAD

    CandidatoModule,

    CvModule,
=======
    CandidatoModule,
    InteligenciaTalentoModule,
    CvModule,
  ],
  providers: [],
})
export class AppModule {}

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
import { EncuestasModule } from './encuestas/encuestas.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
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


    EncuestasModule,
  ],
  providers: [],
})
export class AppModule {}

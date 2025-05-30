// src/respuesta-encuesta/respuesta-encuesta.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from "typeorm";

@Entity()
@Unique(["dni"])
export class RespuestaEncuesta {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  dni: string;

  @Column()
  nombreEmpresa: string;

  @Column({ type: "jsonb" })
  respuestas: {
    trabajoValorado: string;
    claridadObjetivos: string;
    comodidadFeedback: string;
    culturaUnaPalabra: string;
    recomendariaEmpresa: string;
    recursosDisponibles: string;
    capacitacionesUtiles: string;
    equilibrioVidaLaboral: string;
    opinionTenidaEnCuenta: string;
    oportunidadesDesarrollo: string;
  };
}

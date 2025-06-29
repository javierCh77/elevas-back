// src/respuesta-encuesta/respuesta-encuesta.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['dni'])
export class RespuestaEncuesta {
  @PrimaryGeneratedColumn('uuid')
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
  
  @Column()
  areaTrabajo: string;

  @Column({ type: 'jsonb' })
  respuestas: {
    climaComodidadEquipo: string;
    climaAmbienteSaludable: string;
    climaEquilibrioVida: string;
    liderazgoInformacionClara: string;
    liderazgoConfianzaDireccion: string;
    liderazgoOpinionesEscuchadas: string;
    recursosSatisfaccionSalario: string;
    recursosCompensacionJusta: string;
    desarrolloOportunidades: string;
    desarrolloMotivacion: string;
    desarrolloAporteSignificativo: string;
    desarrolloContinuarEmpresa: string;
    reconocimientoValorado: string;
    reconocimientoDisfruteTrabajo: string;
    culturaUnaPalabra: string;
    capacitacionesUtiles: string;
  };
}

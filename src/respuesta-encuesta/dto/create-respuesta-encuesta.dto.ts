import { IsString, IsNotEmpty, IsObject } from "class-validator";

export class CreateRespuestaEncuestaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsNotEmpty()
  nombreEmpresa: string;

  @IsString()
  @IsNotEmpty()
  areaTrabajo: string;

  @IsObject()
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

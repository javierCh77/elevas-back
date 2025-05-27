import { PartialType } from "@nestjs/mapped-types";
import { CreateEventoRRHHDto } from "./create-evento-rrhh.dto";



export class UpdateEventoRRHHDto extends PartialType(CreateEventoRRHHDto) {}

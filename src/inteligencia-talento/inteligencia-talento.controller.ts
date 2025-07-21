import { Controller, Post, Body } from "@nestjs/common";
import { InteligenciaTalentoService } from './inteligencia-talento.service';

import { ExplicacionComparativaDto } from "./dto/explicacion-comparativa.dto";

@Controller("inteligencia-talento")
export class InteligenciaTalentoController {
  constructor(private readonly service: InteligenciaTalentoService) {}


  @Post('comparativa')
  async compararCandidatos(@Body() dto: ExplicacionComparativaDto) {
    return this.service.compararCandidatos(dto);
  }
  
  
}

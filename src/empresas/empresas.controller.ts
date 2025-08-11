import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Get()
  findAll() {
    return this.empresasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEmpresaDto) {
    return this.empresasService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateEmpresaDto,
  ) {
    return this.empresasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresasService.remove(id);
  }
}

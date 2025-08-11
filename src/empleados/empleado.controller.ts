// src/empleados/empleado.controller.ts
import {
  Controller, Get, Post, Patch, Delete, Param, Body,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

function fileName(req: any, file: Express.Multer.File, cb: (error: any, filename: string) => void) {
  const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
  cb(null, unique + extname(file.originalname).toLowerCase());
}

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly service: EmpleadoService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Post()
  @UseInterceptors(FileInterceptor('imagenPerfil', {
    storage: diskStorage({
      destination: './uploads',
      filename: fileName,
    }),
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateEmpleadoDto) {
    return this.service.create(dto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagenPerfil', {
    storage: diskStorage({
      destination: './uploads',
      filename: fileName,
    }),
  }))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateEmpleadoDto,
  ) {
    return this.service.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}

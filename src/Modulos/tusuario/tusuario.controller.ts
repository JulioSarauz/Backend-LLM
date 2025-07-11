// adopciones/adopciones.controller.ts
import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { TUsuarioService } from './tusuario.service';

@Controller('usuario')
export class AdopcionesController {
  constructor(private readonly adopcionesService: TUsuarioService) {}

  @Get()
  findAll() {
    return this.adopcionesService.findAll();
  }

  @Post()
  create(@Body() body) {
    
    return this.adopcionesService.create(body);
  }

  @Patch(':id/aprobar')
  aprobar(@Param('id') id: string, @Body('estado') estado: string) {
    return this.adopcionesService.aprobar(id, estado);
  }
}

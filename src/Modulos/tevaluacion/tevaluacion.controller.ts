// adopciones/adopciones.controller.ts
import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { TEvaluacionService } from './tevaluacion.service';

@Controller('evaluacion')
export class AdopcionesController {
  constructor(private readonly tevaluacionService: TEvaluacionService) {}

  @Get()
  findAll() {
    return this.tevaluacionService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.tevaluacionService.create(body);
  }

  @Patch(':id/aprobar')
  aprobar(@Param('id') id: string, @Body('estado') estado: string) {
    return this.tevaluacionService.aprobar(id, estado);
  }
}

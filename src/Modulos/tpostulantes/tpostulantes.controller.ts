// mascotas/mascotas.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TPostulanteService } from './tpostulantes.service';

@Controller('postulante')
export class MascotasController {
  constructor(private readonly tpostulanteService: TPostulanteService) {}

  @Get()
  findAll() {
    return this.tpostulanteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tpostulanteService.findById(id);
  }

  @Post()
  create(@Body() body) {
    return this.tpostulanteService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.tpostulanteService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tpostulanteService.delete(id);
  }
}
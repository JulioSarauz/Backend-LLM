import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TPostulanteService } from './tpostulantes.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Postulantes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('postulante')
export class PostulantesController {
  constructor(private readonly tpostulanteService: TPostulanteService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene el listado completo de postulantes' })
  @ApiResponse({ status: 200, description: 'Lista de postulantes retornada con éxito.' })
  findAll() {
    return this.tpostulanteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene la información de un postulante por su ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID único del postulante' })
  @ApiResponse({ status: 200, description: 'Postulante encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tpostulanteService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo registro de postulante' })
  @ApiResponse({ status: 201, description: 'Postulante creado con éxito.' })
  create(@Body() body: any) {
    return this.tpostulanteService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza la información de un postulante' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID único del postulante' })
  @ApiResponse({ status: 200, description: 'Postulante actualizado con éxito.' })
  update(@Param('id') id: string, @Body() body: any) {
    return this.tpostulanteService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un postulante del sistema' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID único del postulante a eliminar' })
  @ApiResponse({ status: 200, description: 'Postulante eliminado con éxito.' })
  remove(@Param('id') id: string) {
    return this.tpostulanteService.delete(id);
  }
}
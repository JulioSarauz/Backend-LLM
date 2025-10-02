import { Controller, Get, Post, Patch, Param, Body, HttpStatus } from '@nestjs/common';
import { TUsuarioService } from './tusuario.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarEstadoDto } from './dto/actualizar-estado.dto';


@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly adopcionesService: TUsuarioService) {}
  @Get()
  @ApiOperation({ summary: 'Obtiene la lista completa de todos los usuarios/solicitudes de adopción.' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente.' })
  findAll() {
    return this.adopcionesService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Crea un nuevo registro de usuario o solicitud de adopción.' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, // 201
    description: 'El registro ha sido creado exitosamente.'
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  create(@Body() body: CrearUsuarioDto) { 
    return this.adopcionesService.create(body);
  }
  @Patch(':id/aprobar')
  @ApiOperation({ summary: 'Aprueba o rechaza una solicitud de usuario/adopción por su ID.' })
  @ApiParam({ 
    name: 'id', 
    type: 'string', 
    description: 'El ID único del usuario o solicitud a modificar.'
  })
  @ApiBody({ 
    type: ActualizarEstadoDto,
    description: 'Objeto que contiene el nuevo estado (ej: "Aprobado", "Rechazado").'
  })
  @ApiResponse({ status: 200, description: 'El estado del registro fue actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario/Solicitud no encontrada.' })
  aprobar(@Param('id') id: string, @Body('estado') estado: string) {
    return this.adopcionesService.aprobar(id, estado);
  }
}
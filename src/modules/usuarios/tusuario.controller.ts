import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarEstadoDto } from './dto/actualizar-estado.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene la lista completa de analistas y reclutadores.' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente.' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene la información de un usuario específico por su ID.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID único del usuario en MongoDB.' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo registro de analista o reclutador.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'El usuario ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos o el correo ya existe.' })
  create(@Body() body: CrearUsuarioDto) { 
    return this.usuarioService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza la información general de un usuario (nombres, roles, etc.).' })
  @ApiParam({ name: 'id', type: 'string', description: 'El ID único del usuario a modificar.' })
  @ApiBody({ type: ActualizarUsuarioDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente.' })
  update(@Param('id') id: string, @Body() body: ActualizarUsuarioDto) {
    return this.usuarioService.update(id, body);
  }

  @Patch(':id/aprobar')
  @ApiOperation({ summary: 'Habilita o deshabilita el acceso de un usuario al sistema.' })
  @ApiParam({ name: 'id', type: 'string', description: 'El ID único del usuario a modificar.' })
  @ApiBody({ type: ActualizarEstadoDto })
  @ApiResponse({ status: 200, description: 'El estado del usuario fue actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  aprobar(@Param('id') id: string, @Body('estado') estado: string) {
    return this.usuarioService.aprobar(id, estado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina lógicamente a un usuario del sistema.' })
  @ApiParam({ name: 'id', type: 'string', description: 'El ID único del usuario a eliminar.' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
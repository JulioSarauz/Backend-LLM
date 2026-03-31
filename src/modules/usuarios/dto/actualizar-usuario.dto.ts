import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CrearUsuarioDto } from './crear-usuario.dto';

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {
  @ApiProperty({ example: 'Jefe de Talento Humano', description: 'Nuevo cargo o rol actualizado', required: false })
  cargo?: string;
}
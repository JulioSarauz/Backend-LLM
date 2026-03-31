import { ApiProperty } from '@nestjs/swagger';

export class ActualizarEstadoDto {
  @ApiProperty({ example: 'Inactivo', enum: ['Activo', 'Inactivo'], description: 'Nuevo estado de acceso al sistema' })
  estado: string;
}
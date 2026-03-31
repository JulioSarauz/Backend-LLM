import { ApiProperty } from '@nestjs/swagger';

export class CrearUsuarioDto {
  @ApiProperty({ example: 'j.sarauz@29deoctubre.fin.ec', description: 'Correo corporativo del usuario' })
  email: string;

  @ApiProperty({ example: 'Julio Sarauz', description: 'Nombres completos' })
  nombres: string;

  @ApiProperty({ example: 'Analista de Talento Humano', description: 'Cargo o rol' })
  cargo: string;

  @ApiProperty({ example: 'Activo', enum: ['Activo', 'Inactivo'], description: 'Estado inicial del usuario' })
  estado: string;
}
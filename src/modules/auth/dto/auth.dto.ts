import { ApiProperty, PartialType } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'reclutador@example.com', description: 'Correo corporativo del usuario' })
  email: string;

  @ApiProperty({ example: 'clave123', description: 'Contraseña de acceso', required: false })
  password?: string;

  @ApiProperty({ example: 'Julio Sarauz', description: 'Nombres completos del reclutador o analista' })
  nombres: string;
}

export class LoginDto {
  @ApiProperty({ example: 'reclutador@example.com', description: 'Correo corporativo' })
  email: string;

  @ApiProperty({ example: 'clave123', description: 'Contraseña de acceso' })
  password?: string;
}
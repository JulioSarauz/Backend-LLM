import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearUsuarioDto {
  @ApiProperty({
    description: 'Nombre completo del solicitante. (Requerido)',
    example: 'Juan Pérez'
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico institucional.',
    example: 'juan.perez@ejemplo.com',
    required: false
  })
  @IsString()
  @IsOptional()
  correoinstitucional?: string;

  @ApiProperty({
    description: 'Cargo o posición del solicitante.',
    example: 'Gerente de Proyectos',
    required: false
  })
  @IsString()
  @IsOptional()
  cargo?: string; 
}
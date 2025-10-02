import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class ActualizarEstadoDto {
  @ApiProperty({ 
    description: 'Nuevo estado de la solicitud.', 
    example: 'Aprobado',
    enum: ['Pendiente', 'Aprobado', 'Rechazado']
  })
  @IsString()
  @IsIn(['Pendiente', 'Aprobado', 'Rechazado']) 
  estado: string;
}
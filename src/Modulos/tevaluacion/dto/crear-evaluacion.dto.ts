// adopciones/dto/crear-evaluacion.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CrearEvaluacionDto {
  @ApiProperty({
    description: 'El resultado inicial de la evaluación o un resumen.',
    example: 'Pendiente de análisis'
  })
  @IsString()
  @IsNotEmpty()
  resultado: string;

  @ApiProperty({
    description: 'ID del postulante al que pertenece esta evaluación (Foreign Key).',
    example: '60c72b1f9b1d9c001f8e4c9a'
  })
  @IsString()
  @IsNotEmpty()
  fktpostulante: string;
  
  // Si tu servicio llena 'estado', 'fecharegistro' y 'responsable' automáticamente, 
  // no los incluyas en el DTO de creación para el cliente.
}
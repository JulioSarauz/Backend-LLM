import { ApiProperty } from '@nestjs/swagger';

export class CreateEvaluacionDto {
  @ApiProperty({ example: 'Pendiente', description: 'Estado actual de la evaluación' })
  estado: string;

  @ApiProperty({ example: '2026-03-31T10:00:00Z', description: 'Fecha en la que se registró el análisis' })
  fecharegistro: string;

  @ApiProperty({ example: 'Julio Sarauz', description: 'Reclutador responsable del análisis' })
  responsable: string;

  @ApiProperty({ example: '65f1a2b3c4d5e6f7a8b9c0d1', description: 'ID de Mongo del postulante asociado' })
  fktpostulante: string;
}

export class AprobarEvaluacionDto {
  @ApiProperty({ example: 'Aprobado', enum: ['Aprobado', 'Rechazado', 'En Revisión'], description: 'Nuevo estado de la evaluación' })
  estado: string;
}

export class EvaluarCvDto {
  @ApiProperty({ example: '["React", "NestJS", "Microservicios", "Liderazgo"]', description: 'Arreglo de palabras clave en formato string JSON para evaluar' })
  keywords: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Archivos PDF de las hojas de vida', isArray: true })
  files: any[];
}
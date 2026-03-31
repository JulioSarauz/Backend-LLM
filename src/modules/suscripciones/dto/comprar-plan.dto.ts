import { ApiProperty } from '@nestjs/swagger';

export class ComprarPlanDto {
  @ApiProperty({ example: 'Profesional', enum: ['Basico', 'Profesional', 'Corporativo'], description: 'Nombre del plan a adquirir' })
  plan: string;
}
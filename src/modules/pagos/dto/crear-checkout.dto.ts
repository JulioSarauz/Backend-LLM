import { ApiProperty } from '@nestjs/swagger';

export class CrearCheckoutDto {
  @ApiProperty({ example: 'Profesional', enum: ['Basico', 'Profesional', 'Corporativo'] })
  plan: string;
}
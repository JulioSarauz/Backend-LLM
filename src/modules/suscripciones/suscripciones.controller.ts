import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { ComprarPlanDto } from './dto/comprar-plan.dto';

@ApiTags('Suscripciones')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('suscripciones')
export class SuscripcionesController {
  constructor(private readonly suscripcionesService: SuscripcionesService) {}

  @Post('comprar')
  @ApiOperation({ summary: 'Procesa la compra de un plan y asigna los tokens al usuario logueado.' })
  @ApiBody({ type: ComprarPlanDto })
  comprarPlan(@Req() req, @Body() body: ComprarPlanDto) {
    return this.suscripcionesService.procesarCompra(req.user.userId, body.plan);
  }
}
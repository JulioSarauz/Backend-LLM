import { Controller, Post, Body, Req, Headers, UseGuards, RawBodyRequest } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { CrearCheckoutDto } from './dto/crear-checkout.dto';

@ApiTags('Pagos')
@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('checkout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Genera el link de pago de Stripe para un plan.' })
  @ApiBody({ type: CrearCheckoutDto })
  crearCheckout(@Req() req, @Body() body: CrearCheckoutDto) {
    return this.pagosService.crearSesionCheckout(req.user.userId, req.user.email, body.plan);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Endpoint para recibir eventos automáticos de Stripe.' })
  manejarWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.pagosService.manejarWebhook(req, signature);
  }
}
import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CrearOrdenDto } from './dto/crear-orden.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Pagos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('crear-orden')
  @ApiOperation({ summary: 'Crea una orden de pago en PayPal para adquirir tokens.' })
  @ApiBody({ type: CrearOrdenDto })
  crearOrden(@Req() req, @Body() crearOrdenDto: CrearOrdenDto) {
    const userId = req.user.userId;
    
    return this.pagosService.crearOrden({
      ...crearOrdenDto,
      usuarioId: userId
    });
  }

  @Post('capturar-orden/:orderId')
  @ApiOperation({ summary: 'Captura el pago en PayPal y acredita los tokens.' })
  @ApiParam({ name: 'orderId' })
  capturarOrden(@Param('orderId') orderId: string) {
    return this.pagosService.capturarOrden(orderId);
  }
}
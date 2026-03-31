import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('App')
//@ApiBearerAuth()
//@UseGuards(AuthGuard('jwt'))
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica el estado de la API' })
  @ApiResponse({ status: 200, description: 'La API está funcionando correctamente.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
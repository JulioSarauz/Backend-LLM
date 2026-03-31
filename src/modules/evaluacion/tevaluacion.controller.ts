import { Controller, Get, Post, Patch, Param, Body, UseInterceptors, UploadedFiles, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { TEvaluacionService } from './tevaluacion.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateEvaluacionDto, AprobarEvaluacionDto, EvaluarCvDto } from './dto/crear-evaluacion.dto';
import * as pdfParse from 'pdf-parse';
import { AuthGuard } from '@nestjs/passport';
import { UsuariosService } from '../usuarios/usuarios.service';

@ApiTags('Evaluacion')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('evaluacion')
export class EvaluacionController {
  constructor(
    private readonly tevaluacionService: TEvaluacionService,
    private readonly usuariosService: UsuariosService
  ) { }

  @Get()
  @ApiOperation({ summary: 'Obtiene el listado completo de evaluaciones' })
  @ApiResponse({ status: 200, description: 'Lista de evaluaciones retornada con éxito.' })
  findAll() {
    return this.tevaluacionService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crea un registro manual de evaluación' })
  @ApiBody({ type: CreateEvaluacionDto })
  create(@Body() body: CreateEvaluacionDto) {
    return this.tevaluacionService.create(body);
  }

  @Patch(':id/aprobar')
  @ApiOperation({ summary: 'Actualiza el estado de una evaluación (Aprobar/Rechazar)' })
  @ApiBody({ type: AprobarEvaluacionDto })
  aprobar(@Param('id') id: string, @Body() body: AprobarEvaluacionDto) {
    return this.tevaluacionService.aprobar(id, body.estado);
  }

  @Post('evaluar')
  @ApiOperation({ summary: 'Analiza múltiples CVs usando IA. Costo: 5 Tokens.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: EvaluarCvDto })
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Req() req,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const COSTO_POR_ANALISIS = 5;

    await this.usuariosService.deducirTokensParaAnalisis(req.user.userId, COSTO_POR_ANALISIS);

    try {
      const keywords = typeof body.keywords === 'string'
        ? JSON.parse(body.keywords)
        : body.keywords;
        
      if (!files || files.length === 0) {
        throw new BadRequestException('No se subió ningún archivo');
      }

      let content = '';
      for(let i=0; i < files.length; i++){
        const file = files[i];
        const pdfContent = await pdfParse(file.buffer);
        const lector = pdfContent.text;
        content += this.tevaluacionService.ObtenerContenido(lector, i) + '\n';
      }

      return await this.tevaluacionService.evaluateResumeCHATGPT(content, keywords);

    } catch (error) {
      await this.usuariosService.reembolsarTokens(req.user.userId, COSTO_POR_ANALISIS);
      throw error;
    }
  }
}
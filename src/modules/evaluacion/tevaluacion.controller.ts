import { Controller, Post, Body, Get, UseGuards, Req, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TEvaluacionService } from './tevaluacion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('evaluacion')
export class TEvaluacionController {
  constructor(private readonly tevaluacionService: TEvaluacionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('historial')
  async getHistorial(@Req() req) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    return this.tevaluacionService.getHistorialByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('evaluar')
  @UseInterceptors(FilesInterceptor('files'))
  async evaluarCV(
    @Req() req,
    @UploadedFiles() files: Express.Multer.File[],
    @Body('keywords') keywordsString: string
  ) {
    const userId = req.user.userId || req.user.id || req.user.sub;

    if (!files || files.length === 0) {
      throw new BadRequestException('No se recibieron archivos.');
    }

    let keywords: string[] = [];
    try {
      keywords = JSON.parse(keywordsString);
    } catch (error) {
      throw new BadRequestException('Formato de keywords inválido.');
    }

    let content = '';
    for (const file of files) {
      content += `\n\n--- CV POSTULANTE: ${file.originalname} ---\n`;
      
      if (file.mimetype === 'application/pdf') {
        try {
          const pdf = require('pdf-parse');
          const data = await pdf(file.buffer);
          content += data.text;
        } catch (e) {
          content += file.buffer.toString('utf-8');
        }
      } else {
        content += file.buffer.toString('utf-8');
      }
    }

    return this.tevaluacionService.evaluateResumeCHATGPT(userId, content, keywords);
  }
}
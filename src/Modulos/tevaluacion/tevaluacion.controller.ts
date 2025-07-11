// adopciones/adopciones.controller.ts
import { Controller, Get, Post, Patch, Param, Body, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { TEvaluacionService } from './tevaluacion.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as pdfParse from 'pdf-parse';

@Controller('evaluacion')
export class AdopcionesController {
  constructor(private readonly tevaluacionService: TEvaluacionService) { }

  @Get()
  findAll() {
    return this.tevaluacionService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.tevaluacionService.create(body);
  }

  @Patch(':id/aprobar')
  aprobar(@Param('id') id: string, @Body('estado') estado: string) {
    return this.tevaluacionService.aprobar(id, estado);
  }

  @Post('evaluar')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const keywords = typeof body.keywords === 'string'
      ? JSON.parse(body.keywords)
      : body.keywords;
    if (!files || files.length === 0) {
      throw new BadRequestException('No se subió ningún archivo');
    }
    const file = files[0];
    const pdfContent = await pdfParse(file.buffer);
    const content = pdfContent.text;
    return this.tevaluacionService.evaluateResumeCHATGPT(content, keywords);
  }
}

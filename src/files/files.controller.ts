import { Controller, Post, Get, UseInterceptors, UploadedFile, UseGuards, Request, Delete, Param } from '@nestjs/common'; 
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) 
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get() 
  @ApiOperation({ summary: 'Отримання списку всіх файлів користувача' })
  findAll(@Request() req) {
    return this.filesService.findAll(req.user.userId);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Завантаження файлу' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.filesService.create(file, req.user.userId);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Видалення файлу' })
  remove(@Param('id') id: string, @Request() req) {
    return this.filesService.remove(+id, req.user.userId);
}
}
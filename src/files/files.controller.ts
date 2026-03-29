import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('files')
@Controller('files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) 
export class FilesController {
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, cb) => {
        // Генеруємо ім'я: Таймстамп-Рандом.розширення
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
  uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
    
    return {
      userId: req.user.userId,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
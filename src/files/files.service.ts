import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>, 
  ) {}

  async create(file: Express.Multer.File, userId: number) {
    const newFile = this.repository.create({
      filename: file.originalname, 
      path: file.path,             
      mimetype: file.mimetype,     
      size: file.size,             
      user: { id: userId },        
    });

    
    return await this.repository.save(newFile);
  }
}
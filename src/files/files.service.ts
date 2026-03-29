import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>, 
  ) {}

  async create(file: Express.Multer.File, userId: number, comment?: string, deleteAt?: string) {
    const newFile = this.repository.create({
      filename: file.originalname, 
      path: file.path,             
      mimetype: file.mimetype,     
      size: file.size,
      comment: comment || undefined, 
      deleteAt: deleteAt ? new Date(deleteAt) : undefined, 
      user: { id: userId } as any, 
    });

    return await this.repository.save(newFile);
  } 

  async findAll(userId: number) {
    return this.repository.find({
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: 'DESC', 
      },
    });
  }

  async remove(id: number, userId: number) {
    const file = await this.repository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!file) {
      throw new NotFoundException('Файл не знайдено');
    }

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return this.repository.remove(file);
  }
}
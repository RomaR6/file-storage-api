import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static'; 
import { join } from 'path'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/entities/file.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), 
      serveRoot: '/uploads', 
    }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',      
      port: 5432,             
      username: 'user',       
      password: 'password',   
      database: 'file_storage_api', 
      entities: [User, FileEntity],       
      synchronize: true,      
    }),
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
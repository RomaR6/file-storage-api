import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('File Storage API') 
    .setDescription('Документація API для файлового сховища')
    .setVersion('1.0')
    .addTag('auth') 
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:3000/api`);
}
bootstrap();

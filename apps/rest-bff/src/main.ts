import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'yaml';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

//Set up environment configuration

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  //Create Swagger API documentation fologgin OpenAPI specification
  const config = new DocumentBuilder()
    .setTitle('REST API as BFF for Stuart application challenge')
    .setDescription('Logs REST API')
    .setVersion('1.0')
    .addTag('logs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  //Store "document" as yaml file in same directory with yml library without fs.writeFileSync
  fs.writeFileSync('./swagger.yaml', yaml.stringify(document), 'utf-8');
  await app.listen(process.env.APP_PORT);
}

bootstrap();

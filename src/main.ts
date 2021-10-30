import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  var cors = require("cors")

  const app = await NestFactory.create(AppModule);
  await app.use(cors()) // Use this after the variable declaration
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages : false
  }));
  await app.listen(5000);
}
bootstrap();

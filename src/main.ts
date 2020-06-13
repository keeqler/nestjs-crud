import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from '~/filters/all-exceptions.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3333);
}

bootstrap();

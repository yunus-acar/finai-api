import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { CustomLogger } from './shared/logger/custom-logger';

const bootstrap = async () => {
  const server = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  server.useLogger(server.get(CustomLogger));
  server.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = server.get(ConfigService);

  // server.enableCors({
  //   origin: configService.get('app.frontendURL'),
  //   credentials: true,
  // });

  await server.listen(configService.get('app.port'));
};

bootstrap();

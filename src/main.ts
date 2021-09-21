import * as fs from 'fs';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { CORS_WHITE_LIST, PORT } from './configs/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Marble Store Service')
    .setDescription('The API to create products on the service')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-docs.json', JSON.stringify(document));
  SwaggerModule.setup('/docs', app, document);
  SwaggerModule.setup('/', app, document);

  app.enableCors({
    origin: function(origin, callback) {
      if (!origin || CORS_WHITE_LIST.some(domain => origin.includes(domain))) {
        callback(null, true);
      } else {
        console.warn(`CORS: Blocking from origin ${origin}`);
        callback(null, false);
      }
    },
    credentials: true,
  });

  console.log(`Server running on the port ${PORT}`);
  console.log(`The documentation is acessible in /docs`);
  console.log(`CORS configured to accept request from: `);
  CORS_WHITE_LIST.forEach(origin => {
    console.log(`- ${origin}`);
  });

  await app.listen(PORT);
}
bootstrap();

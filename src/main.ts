import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv'
dotenv.config()

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)

  app.enableCors();
  app.enableVersioning()
  app.setGlobalPrefix('api')
  
  await app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`) })
}

start()
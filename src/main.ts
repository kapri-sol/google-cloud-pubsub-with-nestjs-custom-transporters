import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CloudPubSubServer } from './lib/pub-sub.server';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    strategy: new CloudPubSubServer('cloud-turing-2020-01-02', 'test-subcription'),
  });
  await app.listen();
}
bootstrap();

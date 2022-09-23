# Google Cloud Pub Sub with NestJS

Google Cloud Pub Sub을 NestJS Custom transporters를 이용해서 사용해보자.

## example

### Server

```typescript
//main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { CloudPubSubServer } from 'google-cloud-pubsub-with-nestjs-custom-transporters';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    strategy: new CloudPubSubServer({
      projectId: 'your-project-id',
      subscriptionName: 'your-subscription-name',
    }),
  });
  await app.listen();
}
bootstrap();
```

```typescript
// app.controller.ts

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('your-pattern')
  subscribeMessage(@Payload() payload) {
    console.log('your-pattern', payload);
  }
}
```

### Client

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CloudPubSubClientModule } from 'google-cloud-pubsub-with-nestjs-custom-transporters';

@Module({
  imports: [
    CloudPubSubClientModule.register({
      projectId: 'your-project-id',
      topicName: 'your-topic-name',
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
```

```typescript
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PUBSUB_CLIENT } from 'google-cloud-pubsub-with-nestjs-custom-transporters';

@Injectable()
export class AppService {
  constructor(@Inject(PUBSUB_CLIENT) private readonly pubsubClient: ClientProxy) {}

  async publish() {
    this.pubsubClient.send('your-pattern', 'hello').subscribe(console.log);
  }
}
```

## Reference

- [Google Cloud PubSub NodeJS Docs](https://cloud.google.com/nodejs/docs/reference/pubsub/latest)

- [NestJS Custom transporters](https://docs.nestjs.com/microservices/custom-transport)

- [npm @google-cloud/pubsub](https://www.npmjs.com/package/@google-cloud/pubsub)

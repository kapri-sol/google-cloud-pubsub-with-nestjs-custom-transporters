# Google Cloud Pub Sub with NestJS

Google Cloud Pub Sub을 NestJS Custom transporters를 이용해서 사용해보자.

## example

### Server

```typescript
//main.ts

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { CloudPubSubServer } from './lib/pub-sub.server';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    strategy: new CloudPubSubServer('cloud-turing-2020-01-02', 'subcription-name'),
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
export class MessageController {
  @MessagePattern('echo')
  hello(@Payload() data: object) {
    console.log(`echo: ${data}`);
  }

  @MessagePattern('test')
  hello2(@Payload() data: object) {
    console.log(`test ${data}`);
  }
}
```

### Client

```typescript
const publisher = new CloudPubSubClient('cloud-turing-2020-01-02', 'test_event');

publisher.send('echo', 'haha');
```

## Reference

- [Google Cloud PubSub NodeJS Docs](https://cloud.google.com/nodejs/docs/reference/pubsub/latest)

- [NestJS Custom transporters](https://docs.nestjs.com/microservices/custom-transport)

- [npm @google-cloud/pubsub](https://www.npmjs.com/package/@google-cloud/pubsub)

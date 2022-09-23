import { DynamicModule } from '@nestjs/common';
import { CloudPubSubClientOptions, PUBSUB_CLIENT } from './constants';
import { CloudPubSubClient } from './pub-sub.client';

export class CloudPubSubClientModule {
  static register(options: CloudPubSubClientOptions): DynamicModule {
    return {
      module: CloudPubSubClientModule,
      providers: [
        {
          provide: PUBSUB_CLIENT,
          useFactory: async () => {
            return new CloudPubSubClient(options);
          },
        },
      ],
      exports: [PUBSUB_CLIENT],
    };
  }
}

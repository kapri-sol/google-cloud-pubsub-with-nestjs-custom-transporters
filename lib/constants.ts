import { FactoryProvider } from '@nestjs/common';
import { CloudPubSubClient } from './pub-sub.client';

export const PUBSUB_CLIENT = 'PUBSUB_CLIENT';

export type CloudPubSubClientOptions = {
  projectId: string;
  topicName: string;
};

export const PubSubClientFactory = (options: CloudPubSubClientOptions): FactoryProvider => ({
  provide: PUBSUB_CLIENT,
  useFactory: () => new CloudPubSubClient(options.projectId, options.topicName),
});

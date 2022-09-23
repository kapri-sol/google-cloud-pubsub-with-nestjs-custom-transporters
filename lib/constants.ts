import { FactoryProvider } from '@nestjs/common';
import { CloudPubSubClient } from './pub-sub.client';

export const PUBSUB_CLIENT = 'PUBSUB_CLIENT';

export type CloudPubSubClientOptions = {
  projectId: string;
  topicName: string;
  teardown?: () => void;
  dispatch?: (packet: ReadPacket<any>) => void;
};

export type CloudPubSubServerOptions = {
  projectId: string;
  subscriptionName: string;
};

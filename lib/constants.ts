export const PUBSUB_CLIENT = 'PUBSUB_CLIENT';

export type PubSubMessage = {
  pattern: string;
  data: string;
};

export type CloudPubSubClientOptions = {
  projectId: string;
  topicName: string;
  teardown?: () => void;
};

export type CloudPubSubServerOptions = {
  projectId: string;
  subscriptionName: string;
};

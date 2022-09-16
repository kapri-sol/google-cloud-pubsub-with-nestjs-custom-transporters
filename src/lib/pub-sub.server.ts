import { Message, PubSub, Subscription } from '@google-cloud/pubsub';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';

export class CloudPubSubServer extends Server implements CustomTransportStrategy {
  private pubsub: PubSub;
  private subscription: Subscription;

  /**
   * Creates an instance of CloudPubSubServer.
   * @param {string} projectId 프로젝트 ID
   * @param {string} subscriptionName 구독 이름
   * @memberof CloudPubSubServer
   */

  constructor(private readonly projectId: string, private readonly subscriptionName: string) {
    super();

    this.pubsub = new PubSub({
      projectId: this.projectId,
    });
  }

  async listen(callback: (...optionalParams: unknown[]) => any) {
    this.subscription = await this.pubsub.subscription(this.subscriptionName);

    this.subscription.on('message', (message: Message) => {
      this.handle(message);
      message.ack();
    });

    callback();
  }

  async close() {
    await this.pubsub.close();
  }

  private async handle(message: Message) {
    const { pattern, data } = this.convertMessageData(message.data);

    const handler = this.getHandlerByPattern(pattern);

    if (!handler) {
      return;
    }

    await handler(data);
  }

  private convertMessageData(messageData: Message['data']) {
    try {
      return JSON.parse(messageData.toString());
    } catch (err) {
      return messageData.toString();
    }
  }
}

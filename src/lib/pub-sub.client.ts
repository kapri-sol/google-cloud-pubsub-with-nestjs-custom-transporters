import { PubSub, Topic } from '@google-cloud/pubsub';
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

export class CloudPubSubClient extends ClientProxy {
  private pubsub: PubSub;
  private topic: Topic;

  constructor(private readonly projectId: string, private readonly topicName: string) {
    super();

    this.pubsub = new PubSub({
      projectId: this.projectId,
    });
  }

  async connect(): Promise<any> {
    this.topic = await this.pubsub.topic(this.topicName);
  }

  async close() {
    await this.pubsub.close();
  }

  protected async dispatchEvent<T = any>(packet: ReadPacket<any>): Promise<T> {
    console.log('event to dispatch :', packet);
    return;
  }

  protected publish(packet: ReadPacket<any>, callback: (packet: WritePacket<any>) => void): () => void {
    this.topic.publishMessage({
      data: Buffer.from(
        JSON.stringify({
          pattern: packet.pattern,
          data: packet.data,
        }),
      ),
    });

    callback({
      response: packet.data,
    });

    return () => console.log('teardown');
  }
}
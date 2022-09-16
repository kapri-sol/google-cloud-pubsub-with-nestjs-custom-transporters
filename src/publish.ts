import { lastValueFrom } from 'rxjs';
import { CloudPubSubClient } from './lib/pub-sub.client';

async function bootstrap() {
  const publisher = new CloudPubSubClient('cloud-turing-2020-01-02', 'test_event');

  const result = await lastValueFrom(publisher.send('echo', 'haha'));
  console.log(result);
}
bootstrap();

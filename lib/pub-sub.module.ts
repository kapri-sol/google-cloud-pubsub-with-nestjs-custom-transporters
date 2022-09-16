import { DynamicModule, Module } from '@nestjs/common';
import { CloudPubSubClientOptions, PubSubClientFactory } from './constants';

@Module({})
export class CloudPubSubClientModule {
  static register(options: CloudPubSubClientOptions): DynamicModule {
    return {
      module: CloudPubSubClientModule,
      providers: [PubSubClientFactory(options)],
      exports: [PubSubClientFactory(options)],
    };
  }
}

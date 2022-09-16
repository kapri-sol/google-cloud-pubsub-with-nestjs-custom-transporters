import { Module } from '@nestjs/common';
import { MessageController } from './pub-sub.controller';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [],
})
export class AppModule {}

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

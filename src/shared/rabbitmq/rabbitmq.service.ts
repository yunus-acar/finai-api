import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService
  extends ClientRMQ
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      queue: configService.get('rabbitmq.queue'),
      urls: configService.get('rabbitmq.url'),
      queueOptions: {
        durable: false,
      },
    });
  }

  async onModuleInit() {
    await this.connect();
    console.log('RabbitMQ connected');
  }

  async onModuleDestroy() {
    await this.close();
  }
}

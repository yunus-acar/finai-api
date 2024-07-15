import { Module } from '@nestjs/common';
import { TransactionResolver } from './transactions.resolver';
import { TransactionService } from './transactions.service';
import { TransactionRepository } from './transactions.repository';
import { RabbitMQService } from 'src/shared/rabbitmq/rabbitmq.service';
import { RabbitMQModule } from 'src/shared/rabbitmq/rabbitmq.module';
@Module({
  imports: [RabbitMQModule],
  providers: [
    TransactionResolver,
    TransactionService,
    RabbitMQService,
    TransactionRepository,
  ],
})
export class TransactionModule {}

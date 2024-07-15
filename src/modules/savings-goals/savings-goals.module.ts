import { Module } from '@nestjs/common';
import { SavingsGoalsRepository } from './savings-goals.repository';
import { SavingsGoalsService } from './savings-goals.service';
import { SavingsGoalsResolver } from './savings-goals.resolver';
import { RabbitMQModule } from 'src/shared/rabbitmq/rabbitmq.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [RabbitMQModule, UsersModule],
  providers: [
    SavingsGoalsRepository,
    SavingsGoalsService,
    SavingsGoalsResolver,
  ],
})
export class SavingsGoalsModule {}

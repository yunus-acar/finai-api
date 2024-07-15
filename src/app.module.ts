import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { GraphqlModule } from './graphql.module';
import { LoggerModule } from './modules/logger/logger.module';

import { DatabaseModule } from './shared/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './shared/graphql/graphql-config.service';

import typeormConfig from './shared/config/typeorm.config';
import appConfig from './shared/config/app.config';
import databaseConfig from './shared/config/database.config';
import jwtConfig from './shared/config/jwt.config';
import emailConfig from './shared/config/email.config';
import rabbitmqConfig from './shared/config/rabbitmq.config';
import { RabbitMQModule } from './shared/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate,
      load: [
        appConfig,
        databaseConfig,
        typeormConfig,
        jwtConfig,
        emailConfig,
        rabbitmqConfig,
      ],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    LoggerModule,
    GraphqlModule,
    DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}

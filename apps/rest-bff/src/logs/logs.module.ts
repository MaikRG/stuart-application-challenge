import { Module } from '@nestjs/common';
import { GraphQLClient } from './clients/graphql-client';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/${process.env.ENV}.env`,
      isGlobal: true,
    }),
  ],
  controllers: [LogsController],
  providers: [
    GraphQLClient,
    LogsService,
    {
      provide: GraphQLClient,
      useValue: new GraphQLClient(`${process.env.LOGGING_SERVICE_HOST}`),
    },
  ],
  exports: [LogsService],
})
export class LogsModule {}

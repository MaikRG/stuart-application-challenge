import { Injectable } from '@nestjs/common';
import { CreateLogRequestDto } from './dto/create-log.request.dto';
import { GraphQLClient } from './clients/graphql-client';

@Injectable()
export class LogsService {
  constructor(private readonly client: GraphQLClient) {
    this.client = client;
  }
  async create(createLogDto: CreateLogRequestDto) {
    return await this.client.addLog(
      createLogDto.job_id,
      createLogDto.message,
      createLogDto.status,
    );
  }
}

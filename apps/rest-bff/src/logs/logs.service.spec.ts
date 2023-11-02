import { Test, TestingModule } from '@nestjs/testing';
import { LogsService } from './logs.service';
import { CreateLogRequestDto } from './dto/create-log.request.dto';
import { GraphQLClient } from './clients/graphql-client';

describe('LogsService', () => {
  let service: LogsService;

  beforeEach(async () => {
    //Generate a mockimplementation of GraphQLClient for the method addLog
    const mockGraphQLClient = {
      addLog: jest.fn((job_id, message, status) => {
        return {
          id: '123e4567-e89b-12d3-a456-426614174000',
          job_id: job_id,
          message: message,
          status: status,
          created_at: '2021-02-07T20:35:00.000Z',
        };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        { provide: GraphQLClient, useValue: mockGraphQLClient },
      ],
    }).compile();

    service = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a new log line', async () => {
    const logDTO: CreateLogRequestDto = {
      job_id: 1234567890,
      message: 'test message',
      status: 'test status',
    };
    const response = await service.create(logDTO);
    expect(response).toBeDefined();
    expect(response.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(response.job_id).toBe(logDTO.job_id);
    expect(response.message).toBe(logDTO.message);
    expect(response.status).toBe(logDTO.status);
    expect(response.created_at).toBe('2021-02-07T20:35:00.000Z');
  });
});

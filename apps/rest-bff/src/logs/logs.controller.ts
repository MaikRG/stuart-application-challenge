import { Controller, Post, Body } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogRequestDto } from './dto/create-log.request.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLogResponseDto } from './dto/create-log.response.dto';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @ApiOkResponse({
    type: CreateLogResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(
    @Body() createLogRequestDto: CreateLogRequestDto,
  ): Promise<CreateLogResponseDto> {
    const result = await this.logsService.create(createLogRequestDto);
    return result;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { CreateLogRequestDto } from './create-log.request.dto';
import { IsUUID } from 'class-validator';

export class CreateLogResponseDto extends CreateLogRequestDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID of the log with UUID format',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  id?: string;
  @ApiProperty({
    description: 'Datetime of the log is created folowwing ISO format',
    example: '2021-01-01T00:00:00.000Z',
    required: true,
  })
  created_at: Date;
}

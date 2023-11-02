import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLogRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Job ID',
    example: '123456',
    required: true,
  })
  job_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Message of the log',
    example: 'Courier started a job with ID 123456 - IN PROGRESS',
    required: true,
  })
  message: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Job status',
    example: 'IN-PROGRESS',
    required: true,
  })
  status: string;
}

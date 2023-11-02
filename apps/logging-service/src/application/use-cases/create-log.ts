import { LogRepository } from "../../domain/log-repository";
import { Log } from "../../domain/models/log";

export class CreateLogUseCase {
  constructor(private readonly logRepository: LogRepository) {}

  async execute(log: Log): Promise<Log> {
    return this.logRepository.save(log);
  }
}

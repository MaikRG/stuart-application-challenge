import { LogRepository } from "../../domain/log-repository";
import { Log } from "../../domain/models/log";

export class GetLogsUseCase {
  constructor(private readonly logRepository: LogRepository) {}

  async execute(): Promise<Log[]> {
    return await this.logRepository.getAll();
  }
}

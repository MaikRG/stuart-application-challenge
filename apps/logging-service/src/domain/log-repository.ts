import { Log } from "./models/log";

export interface LogRepository {
  save(log: Log): Promise<Log>;
  getAll(): Promise<Log[]>;
}

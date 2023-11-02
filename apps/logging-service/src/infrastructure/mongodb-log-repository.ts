import { mongo } from "mongoose";
import { LogRepository } from "../domain/log-repository";
import { Log } from "../domain/models/log";
import { logModel } from "./database/mongodb/schemas/log-schema";

export class MongoDBLogRepository implements LogRepository {
  constructor() {}
  async getAll(): Promise<Log[]> {
    const mongoDBlogs = await logModel.find();

    return mongoDBlogs.map((log) => {
      return new Log(
        log.job_id,
        log.status,
        log.message,
        log.created_at,
        log.id
      );
    });
  }

  async save(log: Log): Promise<Log> {
    const logDocument = new logModel(log);
    await logDocument.save();
    return log;
  }
}

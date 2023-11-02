import { v4 as uuid4 } from "uuid";
import { Log } from "../../../src/domain/models/log";

describe("Log", () => {
  it("should create a Log", () => {
    const log = new Log(12345, "IN-PROGRESS", "Test Message");
    expect(log).toBeInstanceOf(Log);
    expect(log.job_id).toEqual(12345);
    expect(log.status).toEqual("IN-PROGRESS");
    expect(log.message).toEqual("Test Message");
    expect(log.created_at).toBeInstanceOf(Date);
    expect(log.id).toBeDefined();
  });

  it("should create a Log with id and date", () => {
    const log = new Log(
      12345,
      "IN-PROGRESS",
      "Test Message",
      new Date("2023-11-02T12:45:47.826Z"),
      "e736d362-a206-49cc-b564-483313a620ca"
    );
    expect(log).toBeInstanceOf(Log);
    expect(log.job_id).toEqual(12345);
    expect(log.status).toEqual("IN-PROGRESS");
    expect(log.message).toEqual("Test Message");
    expect(log.created_at).toBeInstanceOf(Date);
    expect(log.id).toEqual("e736d362-a206-49cc-b564-483313a620ca");
  });

  it("should return a primitive object", () => {
    const log = new Log(12345, "IN-PROGRESS", "Test Message");
    const logPrimitive = log.toPrimitives();
    expect(logPrimitive).toEqual({
      id: log.id,
      job_id: log.job_id,
      status: log.status,
      message: log.message,
      created_at: log.created_at.toISOString(),
    });
  });
});

import { v4 as uuid4 } from "uuid";

interface ILogPrimitives {
  id: string;
  job_id: number;
  status: string;
  message: string;
  created_at: string;
}

export class Log {
  id: string;
  job_id: number;
  status: string;
  message: string;
  created_at: Date;

  constructor(
    job_id: number,
    status: string,
    message: string,
    created_at?: Date,
    id?: string
  ) {
    this.id = id ? id : uuid4();
    this.job_id = job_id;
    this.status = status;
    this.message = message;
    this.created_at = created_at ? created_at : new Date();
  }

  toPrimitives(): ILogPrimitives {
    return {
      id: this.id,
      job_id: this.job_id,
      status: this.status,
      message: this.message,
      created_at: this.created_at.toISOString(),
    };
  }
}

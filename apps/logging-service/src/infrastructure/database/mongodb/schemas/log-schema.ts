import { Document, model, Schema } from "mongoose";
import { Log } from "../../../../domain/models/log";

const logSchema = new Schema({
  id: { type: String, required: true },
  job_id: { type: Number, required: true },
  status: { type: String, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, required: true },
});

export const logModel = model<Log & Document>("logs", logSchema);

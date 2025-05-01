import { Types, model, Schema } from "mongoose";
import { jobDocument } from "../../common/Interfaces";
import { WorkArrangement } from "../../common/enums";

export const jobSchema = new Schema<jobDocument>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    company: { type: String, required: true, maxLength: 50 },
    location: { type: String },
    workArrangement: {
      type: String,
      enum: Object.values(WorkArrangement),
      required: true,
      default: WorkArrangement.ON_SITE,
    },
    position: { type: String, required: true, maxLength: 100 },
    description: { type: String },
    requirements: [{ type: String, required: true }],
    salary: { type: Number, required: true },
  },
  { timestamps: true }
);

export const jobModel = model<jobDocument>("jobs", jobSchema);

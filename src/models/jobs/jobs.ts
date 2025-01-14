import { Types, model, Schema } from "mongoose";
import { jobDocument } from "../../common/Interfaces";

export const jobSchema = new Schema<jobDocument>(
  {
    company: { type: String, required: true, maxLength: 50 },
    location: { enum: ["on site", "hybrid", "remote"], default: "on site" },
    position: { type: String, required: true, maxLength: 100 },
    description: { type: String },
    requirements: [{ type: String, required: true }],
    salary: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const jobModel = model("Jobs", jobSchema);


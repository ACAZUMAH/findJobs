"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobModel = exports.jobSchema = void 0;
const mongoose_1 = require("mongoose");
exports.jobSchema = new mongoose_1.Schema({
    company: { type: String, required: true, maxLength: 50 },
    location: { enum: ["on site", "hybrid", "remote"], default: "on site" },
    position: { type: String, required: true, maxLength: 100 },
    description: { type: String },
    requirements: [{ type: String, required: true }],
    salary: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.jobModel = (0, mongoose_1.model)("Jobs", exports.jobSchema);
//# sourceMappingURL=jobs.js.map
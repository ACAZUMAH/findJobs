"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobModel = exports.jobSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../../common/enums");
exports.jobSchema = new mongoose_1.Schema({
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: true },
    company: { type: String, required: true, maxLength: 50 },
    location: { type: String },
    workArrangement: {
        type: String,
        enum: Object.values(enums_1.WorkArrangement),
        required: true,
        default: enums_1.WorkArrangement.ON_SITE,
    },
    position: { type: String, required: true, maxLength: 100 },
    description: { type: String },
    requirements: [{ type: String, required: true }],
    salary: { type: Number, required: true },
}, { timestamps: true });
exports.jobModel = (0, mongoose_1.model)("jobs", exports.jobSchema);
//# sourceMappingURL=jobs.js.map